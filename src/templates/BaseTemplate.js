export default class BaseTemplate {

    constructor(ticket) {
        this.ticket = ticket;
    }

    async logo() {
        await this.ticket.logo.print();
    }

    header(data = {}) {
        this.ticket.header.print(data);
    }

    document(data = {}) {
        this.ticket.document.print(data);
    }

    customer(data = {}) {
        this.ticket.customer.print(data);
    }

    products(data = {}) {
        this.ticket.products.print(data);
    }

    summary(data = {}) {
        this.ticket.summary.print(data);
    }

    totals(data = {}) {
        this.ticket.totals.print(data);
    }

    payment(data = {}) {
        this.ticket.payment.print(data);
    }

    footer(data = {}) {
        this.ticket.footer.print(data);
    }

    print() {

        throw new Error(
            `${this.constructor.name} debe implementar print().`
        );

    }

}