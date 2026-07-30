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

        const payment = data.payment ?? {};

        const payments = payment.payments ?? [];

        if (!payments.length) {
            return;
        }

        this.ticket.section('PAGOS');

        this.printPayments(payments);

        if ((payment.change ?? 0) > 0) {

            this.ticket.money(
                'Cambio',
                payment.change
            );

        }

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
                    this.buildLabel(item),
                    item.amount
                );

            });

    }

    /**
     * Construye la etiqueta del método de pago.
     *
     * @param {Object} item
     * @returns {String}
     */
    buildLabel(item) {

        if (item.code) {
            return `${item.code} ${item.method}`;
        }

        return item.method;

    }

}