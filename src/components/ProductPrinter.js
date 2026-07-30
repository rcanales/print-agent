import MoneyHelper from '../helpers/MoneyHelper.js';

export default class ProductPrinter {

    constructor(ticket) {

        this.ticket = ticket;
        this.layout = ticket.layout;
        this.columns = ticket.columns;

    }

    /**
     * Imprime el detalle de productos.
     *
     * @param {Object} data
     */
    print(data) {

        const items = data.items ?? [];

        if (!items.length) {

            this.ticket.left('No hay productos.');

            return;

        }

        this.printHeader();

        items.forEach(item => {

            this.printItem(item);

        });

    }

    /**
     * Encabezado de la tabla de productos.
     */
    printHeader() {

        const c = this.layout.columns;

        this.columns.printRow([
            {
                width: c.qty,
                text: 'Cant'
            },
            {
                width: c.description,
                text: 'Descripción'
            },
            {
                width: c.total,
                text: 'Total',
                align: 'right'
            }
        ]);

        this.ticket.line();

    }

    /**
     * Imprime un producto.
     *
     * @param {Object} item
     */
    printItem(item) {

        this.columns.printRow(
            this.buildColumns(item)
        );

        this.printExtras(item);

    }

    /**
     * Construye las columnas de un producto.
     *
     * Este método podrá sobrescribirse en
     * otras plantillas (CCF, NC, Cotización, etc.).
     *
     * @param {Object} item
     * @returns {Array}
     */
    buildColumns(item) {

        const c = this.layout.columns;

        return [
            {
                width: c.qty,
                text: item.qty
            },
            {
                width: c.description,
                text: item.name ?? item.description
            },
            {
                width: c.total,
                text: MoneyHelper.format(item.total),
                align: 'right'
            }
        ];

    }

    /**
     * Información adicional del producto.
     *
     * Descuentos
     * Observaciones
     * Notas
     * SKU
     *
     * Actualmente no imprime nada,
     * pero queda preparado para crecer.
     *
     * @param {Object} item
     */
    printExtras(item) {

        if (item.note) {

            this.ticket.left(
                `   * ${item.note}`
            );

        }

        if (item.discount > 0) {

            this.ticket.left(
                `   Descuento: ${MoneyHelper.currency(item.discount)}`
            );

        }

    }

}