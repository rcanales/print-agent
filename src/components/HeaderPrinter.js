export default class HeaderPrinter {

    constructor(ticket) {
        this.ticket = ticket;
    }

    print(data = {}) {

        const header = data.header ?? {};
        const business = data.business ?? {};

        this.printHeader(header);

        this.printBusiness(business);

        this.ticket.blank();
    }

    printHeader(header) {

        if (header.title) {
            this.ticket.center(header.title);
        }

        if (header.number) {
            this.ticket.center(header.number);
        }

        if (header.subtitle) {
            this.ticket.center(header.subtitle);
        }

        this.ticket.blank();

    }

    printBusiness(business) {

        this.ticket.sectionTitle(
            'DATOS DEL EMISOR'
        );

        if (business.name) {
            this.ticket.center(business.name);
        }

        this.ticket.blank();

        if (business.nrc) {
            this.ticket.center(
                `NRC: ${business.nrc}`
            );
        }

        if (business.nit) {
            this.ticket.center(
                `NIT: ${business.nit}`
            );
        }

        if (business.address) {
            this.ticket.center(
                business.address
            );
        }

        if (business.giro) {
            this.ticket.center(
                `GIRO: ${business.giro}`
            );
        }

    }

}