import TicketFactory from '../factories/TicketFactory.js';
import TemplateFactory from '../factories/TemplateFactory.js';
import PrinterFactory from '../factories/PrinterFactory.js';

export default class PrintService {

    async print(payload) {

        const { metadata, printer, document, options } = payload;

        const printerDevice = await PrinterFactory.create(printer);

        const copies = options?.copies || 1;

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

            template.print(
                document
            );

            this.applyOptions(ticket, options);

            await ticket.execute();
        }

    }

    applyOptions(ticket, options = {}) {

        const {
            feed = 0,
            cut = true,
            open_drawer = false,
        } = options;

        if (feed > 0) {
            ticket.feed(feed);
        }

        if (cut) {
            ticket.cut();
        }

        if (open_drawer) {
            ticket.openDrawer?.();
        }

    }

}