import { SerialPort } from 'serialport';
import iconv from 'iconv-lite';
import sharp from 'sharp';

export default class BluetoothPrinter {

    constructor(config = {}) {

        this.path = config.com_port ?? 'COM3';

        this.baudRate = Number(config.baud_rate ?? 9600);

        this.width = Number(config.width ?? 58);

        this.supportsCut = config.supports_cut ?? false;

        this.codePage = config.code_page ?? 'cp850';

        this.codePageCommand = Number(config.code_page_command ?? 2);

        this.buffer = [];

    }

    // ---------------------------------------------------------
    // Buffer de comandos
    // ---------------------------------------------------------

    add(data) {
        this.buffer.push(
            Buffer.isBuffer(data)
                ? data
                : Buffer.from(data)
        );
    }

    clear() {
        this.buffer = [];
    }

    // ---------------------------------------------------------
    // Texto
    // ---------------------------------------------------------

    println(text = '') {
        this.add(
            Buffer.concat([
                iconv.encode(String(text), this.codePage),
                Buffer.from([0x0A])
            ])
        );
    }

    newLine() {
        this.add(Buffer.from([0x0A]));
    }

    // ---------------------------------------------------------
    // Alineación
    // ---------------------------------------------------------

    alignLeft() {
        this.add(Buffer.from([0x1B, 0x61, 0x00]));
    }

    alignCenter() {
        this.add(Buffer.from([0x1B, 0x61, 0x01]));
    }

    alignRight() {
        this.add(Buffer.from([0x1B, 0x61, 0x02]));
    }

    // ---------------------------------------------------------
    // Fuentes
    // ---------------------------------------------------------

    bold(enable = true) {

        this.add(
            Buffer.from([
                0x1B,
                0x45,
                enable ? 0x01 : 0x00
            ])
        );

    }

    setTextDoubleHeight() {
        this.add(Buffer.from([0x1B, 0x21, 0x10]));
    }

    setTextNormal() {
        this.add(Buffer.from([0x1B, 0x21, 0x00]));
    }

    // ---------------------------------------------------------
    // Alimentación
    // ---------------------------------------------------------

    feed(lines = 1) {

        lines = Math.max(
            0,
            Math.min(255, Math.trunc(lines))
        );

        if (lines === 0) return;

        this.add(
            Buffer.from([0x1B, 0x64, lines])
        );

    }

    // ---------------------------------------------------------
    // Código QR - ESC/POS
    // ---------------------------------------------------------

    printQR(value, options = {}) {

        if (!value) return;

        const cellSize = Math.max(
            1,
            Math.min(8, Number(options.cellSize ?? 5))
        );

        const corrections = {
            L: 0x30,
            M: 0x31,
            Q: 0x32,
            H: 0x33,
        };

        const correction =
            corrections[String(options.correction ?? 'M').toUpperCase()]
            ?? corrections.M;

        const data = Buffer.from(String(value), 'utf8');

        const length = data.length + 3;

        const pL = length & 0xFF;
        const pH = (length >> 8) & 0xFF;

        this.add(Buffer.from([
            // Seleccionar modelo QR 2
            0x1D, 0x28, 0x6B, 0x04, 0x00,
            0x31, 0x41, 0x32, 0x00,

            // Tamaño del módulo
            0x1D, 0x28, 0x6B, 0x03, 0x00,
            0x31, 0x43, cellSize,

            // Corrección de errores
            0x1D, 0x28, 0x6B, 0x03, 0x00,
            0x31, 0x45, correction,

            // Almacenar contenido
            0x1D, 0x28, 0x6B, pL, pH,
            0x31, 0x50, 0x30,
        ]));

        this.add(data);

        this.add(Buffer.from([
            // Imprimir QR
            0x1D, 0x28, 0x6B, 0x03, 0x00,
            0x31, 0x51, 0x30,
        ]));

    }

    // ---------------------------------------------------------
    // Imagen rasterizada
    // ---------------------------------------------------------

    async printImage(imagePath) {

        const {
            data,
            info
        } = await sharp(imagePath)
            .flatten({ background: '#FFFFFF' })
            .greyscale()
            .threshold(160)
            .raw()
            .toBuffer({ resolveWithObject: true });

        const bytesPerRow = Math.ceil(info.width / 8);

        const imageData = Buffer.alloc(
            bytesPerRow * info.height,
            0
        );

        for (let y = 0; y < info.height; y++) {

            for (let x = 0; x < info.width; x++) {

                const pixel = data[y * info.width + x];

                if (pixel < 128) {

                    const index =
                        y * bytesPerRow + Math.floor(x / 8);

                    imageData[index] |= 0x80 >> (x % 8);

                }

            }

        }

        const widthBytes = bytesPerRow;

        this.add(Buffer.from([
            // GS v 0 - Raster bit image
            0x1D,
            0x76,
            0x30,
            0x00,

            widthBytes & 0xFF,
            (widthBytes >> 8) & 0xFF,

            info.height & 0xFF,
            (info.height >> 8) & 0xFF,
        ]));

        this.add(imageData);

    }

    // ---------------------------------------------------------
    // Corte y gaveta
    // ---------------------------------------------------------

    cut() {

        if (!this.supportsCut) return;

        this.add(Buffer.from([
            0x1D, 0x56, 0x00
        ]));

    }

    openCashDrawer() {

        this.add(Buffer.from([
            0x1B, 0x70, 0x00, 0x19, 0xFA
        ]));

    }

    // ---------------------------------------------------------
    // Transmisión serial
    // ---------------------------------------------------------
    async execute() {
        if (!this.buffer.length) return;

        const initialization = Buffer.from([
            0x1B, 0x40,                 // ESC @: inicializar impresora
            0x1B, 0x74, this.codePageCommand // ESC t n: seleccionar página
        ]);

        const data = Buffer.concat([
            initialization,
            ...this.buffer
        ]);

        const port = new SerialPort({
            path: this.path,
            baudRate: this.baudRate,
            dataBits: 8,
            stopBits: 1,
            parity: 'none',
            autoOpen: false
        });

        try {
            await new Promise((resolve, reject) => {
                port.open(error => {
                    if (error) reject(error);
                    else resolve();
                });
            });

            await new Promise((resolve, reject) => {
                port.write(data, error => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    port.drain(error => {
                        if (error) reject(error);
                        else resolve();
                    });
                });
            });

        } finally {
            if (port.isOpen) {
                await new Promise(resolve => {
                    port.close(() => resolve());
                });
            }

            this.clear();
        }
    }

}
