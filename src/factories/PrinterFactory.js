import FakePrinter from '../drivers/FakePrinter.js';
import BluetoothPrinter from '../drivers/BluetoothPrinter.js';

import {
    createPrinter,
    checkPrinter
} from '../config/printer.js';

export default class PrinterFactory {

    static async create(printer) {

        if (process.env.PRINTER_DRIVER === 'fake') {
            return new FakePrinter(printer.width);
        }

        const connectionType = printer.connection_type ?? 'network';

        switch (connectionType) {

            case 'network': {

                const device = createPrinter(
                    printer.ip_address ?? printer.ip,
                    printer.port
                );

                await checkPrinter(device);

                return device;
            }

            case 'bluetooth': {

                if (!printer.com_port) {
                    throw new Error(
                        'No se ha configurado el puerto COM de la impresora Bluetooth'
                    );
                }

                return new BluetoothPrinter({
                    com_port: printer.com_port,
                    baud_rate: printer.baud_rate ?? 9600,
                    width: printer.width,
                    supports_cut: printer.supports_cut ?? false,
                });

            }

            case 'usb': {

                throw new Error(
                    'El transporte USB todavía no está implementado'
                );

            }

            default:

                throw new Error(
                    `Tipo de conexión no soportado: ${connectionType}`
                );

        }

    }

}
