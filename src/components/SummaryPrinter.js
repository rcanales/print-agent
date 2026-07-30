export default class SummaryPrinter {

    constructor(ticket) {
        this.ticket = ticket;
    }

    print(summary = {}) {

        const fields = this.buildFields(summary);

        if (!fields.length)
            return;

        this.ticket.section("RESUMEN");

        fields.forEach(field => {

            this.ticket.money(
                field.label,
                field.value
            );

        });

    }

    buildFields(summary) {

        return [

            {
                label: 'Apertura',
                value: summary.opening
            },

            {
                label: 'Ventas Efectivo',
                value: summary.cashSales
            },

            {
                label: 'Ventas Tarjeta',
                value: summary.cardSales
            },

            {
                label: 'Transferencias',
                value: summary.transfers
            },

            {
                label: 'Retiros',
                value: summary.withdrawals
            },

            {
                label: 'Esperado',
                value: summary.expected
            },

            {
                label: 'Contado',
                value: summary.counted
            },

            {
                label: 'Diferencia',
                value: summary.difference
            }

        ].filter(field =>
            field.value !== undefined &&
            field.value !== null
        );

    }

}