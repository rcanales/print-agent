export default class PaymentPrinter {

    constructor(ticket) {
        this.ticket = ticket;
    }

    /**
     * Imprime las formas de pago.
     *
     * @param {Object} data
     */
    print(data = {}) {

        const payments = data.payments ?? [];

        if (!payments.length) {
            return;
        }

        this.ticket.sectionTitle(
            'MÉTODOS DE PAGO'
        );

        this.printPayments(payments);

        this.ticket.blank();

    }

    /**
     * Imprime cada forma de pago.
     *
     * @param {Array} payments
     */
    printPayments(payments) {

        payments
            .filter(item => item.amount !== undefined && item.amount !== null)
            .forEach(item => {

                this.ticket.money(
                    item.method,
                    item.amount
                );

                if ((item.change ?? 0) > 0) {

                    this.ticket.money(
                        'Cambio',
                        item.change
                    );

                }

            });

    }

}