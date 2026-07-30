export default class TotalsPrinter {

    constructor(ticket) {
        this.ticket = ticket;
    }

    /**
     * Imprime el resumen de totales.
     *
     * @param {Object} data
     */
    print(data = {}) {

        const totals = data.totals ?? {};

        this.ticket.section('TOTALES');

        this.printFields(totals);

        this.printGrandTotal(totals);

    }

    /**
     * Imprime los campos de totales.
     *
     * @param {Object} totals
     */
    printFields(totals) {

        this.buildFields(totals)
            .filter(field => this.hasValue(field.value))
            .forEach(field => {

                const printerMethod =
                    field.type ?? 'money';

                if (
                    typeof this.ticket[printerMethod] !== 'function'
                ) {
                    return;
                }

                this.ticket[printerMethod](
                    field.label,
                    field.value
                );

            });

    }

    /**
     * Construye la lista de campos.
     *
     * @param {Object} totals
     * @returns {Array}
     */
    buildFields(totals) {

        return [

            {
                label: 'Ventas Gravadas',
                value: totals.gravadas
            },

            {
                label: 'Ventas Exentas',
                value: totals.exentas
            },

            {
                label: 'Ventas No Sujetas',
                value: totals.noSujetas
            },

            {
                label: 'Subtotal',
                value: totals.subtotal
            },

            {
                label: 'Descuento',
                value: totals.discount
            },

            {
                label: 'IVA',
                value: totals.iva
            },

            {
                label: 'Retención IVA',
                value: totals.retention
            },

            {
                label: 'Percepción',
                value: totals.perception
            },

            {
                label: 'Otros Tributos',
                value: totals.otherTaxes
            },

            {
                label: 'TOTAL',
                value: totals.total
            }

        ];

    }


    printGrandTotal(totals) {

        if (!this.hasValue(totals.total)) {
            return;
        }

        this.ticket.blank();

        this.ticket.doubleLine();

        this.ticket.bold(true);
        this.ticket.doubleHeight();

        this.ticket.money(
            'TOTAL A PAGAR',
            totals.total
        );

        this.ticket.normal();
        this.ticket.bold(false);

        this.ticket.doubleLine();

        this.ticket.blank();

    }

    /**
     * Determina si un valor debe imprimirse.
     *
     * Se imprimen los valores 0.00.
     */
    hasValue(value) {

        return value !== undefined &&
            value !== null;

    }

}