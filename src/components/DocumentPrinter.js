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

        const header = data.header ?? {};

        this.ticket.section(
            header.title ?? 'FACTURA ELECTRÓNICA'
        );

        if (header.type) {
            this.ticket.subtitle(header.type);
        }

        this.ticket.blank();

        this.printFields(header);

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

                this.ticket[printerMethod](
                    field.label,
                    field.value
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
                value: document.generationCode,
                type: 'block'
            },
            {
                label: 'Sello',
                value: document.receivedSeal,
                type: 'block'
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

}