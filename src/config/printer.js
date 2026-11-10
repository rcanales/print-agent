
import { ThermalPrinter, PrinterTypes } from 'node-thermal-printer';

function createPrinter(config) {
    return new ThermalPrinter({
        type: PrinterTypes.EPSON,
        interface: `tcp://${config.ip}:${config.port ?? 9100}`,
        width: config.width === 58 ? 32 : 42,
        characterSet: 'SLOVENIA',
        removeSpecialCharacters: false,
        lineCharacter: '-',
        timeout: 15000,
        options: {
            retryInterval: 1000
        }
    });
}

async function checkPrinter(printer) {
    const isConnected = await printer.isPrinterConnected();

    if (!isConnected) {
        throw new Error('No se pudo conectar con la impresora');
    }
}

export {
    createPrinter,
    checkPrinter
};
