
import TicketFactory from '../factories/TicketFactory.js';
import TemplateFactory from '../factories/TemplateFactory.js';
import PrinterFactory from '../factories/PrinterFactory.js';

export default class PrintService {

    async print(payload) {

        const {
            metadata,
            printer,
            document,
            options
        } = payload;

        const printerDevice = await PrinterFactory.create(printer);

        const copies = Math.max(
            1,
            Number.parseInt(options?.copies, 10) || 1
        );

        for (let copy = 0; copy < copies; copy++) {

            printerDevice.clear?.();

            const ticket = TicketFactory.create(
                printerDevice,
                printer.width
            );

            const template = TemplateFactory.create(
                metadata.document_type,
                ticket
            );

            // Esperar a que termine de procesarse toda la plantilla.
            await template.print(document);

            this.applyOptions(ticket, options);

            // Ejecutar la impresión una vez preparado el ticket.
            await ticket.execute();
        }
    }

    applyOptions(ticket, options = {}) {

        const {
            feed = 0,
            open_drawer = false,
        } = options;

        if (feed > 0) {
            ticket.feed(feed);
        }

        if (open_drawer) {
            ticket.openDrawer?.();
        }
    }
}
