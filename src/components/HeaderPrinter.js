export default class HeaderPrinter {

    constructor(ticket) {
        this.ticket = ticket;
    }

    print(data = {}) {

        const business = data.business ?? {};
        const document = data.document ?? {};

        this.printBusiness(business);

        this.printOrder(document);

    }

    printBusiness(business) {

        if (business.name) {
            this.ticket.title(business.name);
        }

        if (business.email) {
            this.ticket.center(business.email);
        }

        if (business.phone) {
            this.ticket.center(`Tel: ${business.phone}`);
        }

        this.ticket.blank();

        if (business.nit) {
            this.ticket.keyValue('NIT', business.nit);
        }

        if (business.nrc) {
            this.ticket.keyValue('NRC', business.nrc);
        }

        this.ticket.blank();

        if (business.address) {
            this.ticket.block(
                'Dirección',
                business.address
            );
        }

        if (business.activity) {
            this.ticket.block(
                'Giro',
                business.activity
            );
        }

    }

    printOrder(document) {

        if (!document.order) {
            return;
        }

        this.ticket.title(
            `ORDEN #${document.order}`
        );

        this.ticket.blank();

    }

}