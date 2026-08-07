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
    printSummary(totals) {

        this.ticket.shortLine();

        this.ticket.right(
            `SUBTOTAL: ${MoneyHelper.currency(totals.subtotal)}`
        );


        this.ticket.shortLine();

        this.ticket.right(
            `Descuento aplicado: ${MoneyHelper.currency(totals.discount)}`
        );


        this.ticket.shortLine();

        this.ticket.right(
            `TOTAL: ${MoneyHelper.currency(totals.total)}`
        );

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