export default class CustomerPrinter {

    constructor(ticket) {
        this.ticket = ticket;
    }

    /**
     * Imprime la información del receptor.
     *
     * @param {Object} data
     */
    print(data = {}) {

        const customer = data.customer ?? {};

        this.ticket.sectionTitle(
            'DATOS DEL COMPRADOR'
        );

        this.printFields(customer);

        this.ticket.blank();

    }

    /**
     * Imprime los campos del receptor.
     *
     * @param {Object} customer
     */
    printFields(customer) {

        this.buildFields(customer)
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
     * Construye la lista de campos del receptor.
     *
     * @param {Object} customer
     * @returns {Array}
     */
    buildFields(customer) {

        return [
            {
                label: 'Fecha de emisión',
                value: customer.issue_date
            },
            {
                label: 'Nombre',
                value: customer.name
            },
            {
                label: customer.document_type,
                value: customer.document_number
            },
            {
                label: 'Departamento',
                value: customer.department
            },
            {
                label: 'Municipio',
                value: customer.municipality
            },
            {
                label: 'Dirección',
                value: customer.address,
                type: 'block'
            },
            {
                label: 'Giro',
                value: customer.giro,
                type: 'block'
            },
            {
                label: 'Correo',
                value: customer.email
            },
            {
                label: 'Teléfono',
                value: customer.phone
            },
        ];

    }

}