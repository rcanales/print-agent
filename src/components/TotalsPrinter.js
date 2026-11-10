import MoneyHelper from '../helpers/MoneyHelper.js';

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

        this.printSummary(totals);

        this.printAmountInWords(totals.inwords);

    }

    /**
     * Imprime el resumen final de venta.
     *
     * @param {Object} totals
     */

    /**
     * Imprime el resumen final de venta.
     *
     * @param {Object} totals
     */
    printSummary(totals) {

        this.ticket.shortLine();

        this.printTotal(
            'SUBTOTAL:',
            totals.subtotal
        );

        if (totals.tax > 0) {
            this.printTotal(
                'IVA retenido:',
                totals.tax
            );
        }

        if (totals.discount > 0) {

            this.printTotal(
                'Descuento aplicado:',
                totals.discount
            );
        }

        this.ticket.shortLine();

        this.printTotal(
            'TOTAL:',
            totals.total
        );
    }

    /**
     * Imprime una etiqueta a la izquierda y su importe
     * alineado a la derecha, respetando el ancho del ticket.
     *
     * @param {string} label
     * @param {number|string} amount
     */
    printTotal(label, amount) {
        const width = this.ticket.width;
        const value = MoneyHelper.currency(amount);

        const amountWidth = 12;
        const labelWidth = width - amountWidth;

        const formattedAmount = value.padStart(amountWidth);

        // Mantener la etiqueta dentro del espacio disponible.
        const formattedLabel = String(label)
            .slice(0, labelWidth)
            .padEnd(labelWidth);

        const line = `${formattedLabel}${formattedAmount}`;

        this.ticket.raw(line);
    }

    /**
     * Impresión tradicional de campos.
     *
     * @param {Object} totals
     */
    printFields(totals) {

        this.buildFields(totals)
            .filter(field => this.hasValue(field.value))
            .forEach(field => {

                const printerMethod = field.type ?? 'money';

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

    buildFields(totals) {

        return [

            {
                label: 'Ventas Gravadas',
                type: 'money',
                value: totals.gravadas
            },

            {
                label: 'Ventas Exentas',
                type: 'money',
                value: totals.exentas
            },

            {
                label: 'Ventas No Sujetas',
                type: 'money',
                value: totals.noSujetas
            },

            {
                label: 'Subtotal',
                type: 'money',
                value: totals.subtotal
            },

            {
                label: 'Descuento',
                type: 'money',
                value: totals.discount
            },

            {
                label: 'IVA',
                type: 'money',
                value: totals.iva
            },

            {
                label: 'Retención IVA',
                type: 'money',
                value: totals.retention
            },

            {
                label: 'Percepción',
                type: 'money',
                value: totals.perception
            },

            {
                label: 'Otros Tributos',
                value: totals.otherTaxes
            }

        ];

    }

    printAmountInWords(value) {

        if (!value) {
            return;
        }


        this.ticket.blank();


        this.ticket.center(
            value.toUpperCase()
        );


        this.ticket.blank();

    }

    hasValue(value) {

        return value !== undefined &&
            value !== null;

    }

}