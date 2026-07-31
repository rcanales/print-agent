import FakePrinter from '../drivers/FakePrinter.js';

import {
    createPrinter,
    checkPrinter
} from '../config/printer.js';

export default class PrinterFactory {

    static async create(printer) {

        // Modo pruebas
        if (process.env.PRINTER_DRIVER === 'fake') {

            return new FakePrinter(
                printer.width
            );

        }

        // Modo real
        const device = createPrinter(
            printer.ip,
            printer.port
        );

        await checkPrinter(device);

        return device;

    }

}