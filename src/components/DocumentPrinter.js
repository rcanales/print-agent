export default class DocumentPrinter {

    constructor(ticket) {
        this.ticket = ticket;
    }

    /**
     * Imprime la información del documento.
     *
     * @param {Object} data
     */
    print(data = {}) {

        const dte = data.dte ?? {};
        const footer = data.footer ?? {};

        this.ticket.sectionTitle(
            'DOCUMENTO'
        );

        this.printFields(dte);

        this.printQr(footer);

        this.ticket.blank();

    }

    /**
     * Imprime los campos del documento.
     *
     * @param {Object} document
     */
    printFields(document) {

        this.buildFields(document)
            .filter(field => field.value)
            .forEach(field => {

                const printerMethod =
                    field.type ?? 'field';

                if (
                    typeof this.ticket[printerMethod] !== 'function'
                ) {
                    return;
                }

                const options = {
                    align: field.align ?? 'left'
                };

                this.ticket[printerMethod](
                    field.label,
                    field.value,
                    options
                );

            });

    }

    /**
     * Construye la lista de campos del documento.
     *
     * @param {Object} document
     * @returns {Array}
     */
    buildFields(document) {

        return [
            {
                label: 'Número DTE',
                value: document.number
            },
            {
                label: 'Punto Venta',
                value: document.pointOfSale
            },
            {
                label: 'Caja',
                value: document.register
            },
            {
                label: 'Fecha',
                value: document.date
            },
            {
                label: 'Hora',
                value: document.time
            },
            {
                label: 'Empleado',
                value: document.employee
            },
            {
                label: 'Mesa',
                value: document.table
            },
            {
                label: 'Canal',
                value: document.channel
            },
            {
                label: 'Item',
                value: document.item
            },
            {
                label: 'Consulta',
                value: document.url,
                type: 'block'
            },
            {
                label: 'Código Generación',
                value: document.generatedcode,
                type: 'block',
                align: 'center'
            },
            {
                label: 'Sello de Recepción',
                value: document.receivedseal,
                type: 'block',
                align: 'center'
            },
            {
                label: 'Modelo',
                value: document.model
            },
            {
                label: 'Transmisión',
                value: document.transmission
            },
            {
                label: 'Control',
                value: document.control
            }
        ];

    }

    /**
     * Código QR.
     */
    printQr(footer) {

        if (!footer.qr) {
            return;
        }

        this.ticket.qr(
            footer.qr
        );

    }

}