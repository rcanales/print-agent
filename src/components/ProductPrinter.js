import WrapHelper from '../helpers/WrapHelper.js';
import MoneyHelper from '../helpers/MoneyHelper.js';

export default class ProductPrinter {

    constructor(ticket) {

        this.ticket = ticket;
        this.columns = ticket.layout.columns;
        this.width = ticket.layout.width;

    }

    print(data = {}) {

        const items = data.items ?? [];

        if (!items.length) {
            this.ticket.left('No hay productos.');
            return;
        }

        this.printHeader();

        items.forEach(item => {

            this.printItem(item);

            this.printExtras(item);

        });

    }

    printHeader() {

        this.ticket.sectionTitle(
            'DESCRIPCIÓN DE LA COMPRA'
        );

        this.ticket.raw(
            this.buildLine(
                'Cant',
                'Descripción',
                'Precio',
                'Valor'
            )
        );

        this.ticket.line();

    }

    printItem(item) {

        const lines = WrapHelper.wrap(

            item.description ?? item.name ?? '',

            this.columns.description.width

        );

        lines.forEach((description, index) => {

            this.ticket.raw(

                this.buildLine(

                    index === 0
                        ? item.quantity
                        : '',

                    description,

                    index === 0
                        ? MoneyHelper.format(item.price)
                        : '',

                    index === 0
                        ? MoneyHelper.format(item.amount)
                        : ''

                )

            );

        });

    }

    buildLine(quantity, description, price, amount) {

        const buffer =
            Array(this.width).fill(' ');


        this.write(

            buffer,

            this.columns.quantity.start,

            quantity,

            this.columns.quantity.width,

            'left'

        );

        this.write(

            buffer,

            this.columns.description.start,

            description,

            this.columns.description.width,

            'left'

        );

        this.write(

            buffer,

            this.columns.price.start,

            price,

            this.columns.price.width,

            'right'

        );

        this.write(

            buffer,

            this.columns.amount.start,

            amount,

            this.columns.amount.width,

            'right'

        );

        return buffer.join('');

    }

    write(buffer, start, value, width, align = 'left') {

        value = String(value ?? '');


        if (value.length > width) {
            value = value.substring(0, width);
        }


        if (align === 'right') {

            value = value.padStart(width);

        } else {

            value = value.padEnd(width);

        }

        for (let i = 0; i < width; i++) {

            buffer[start + i] = value[i];

        }

    }

    printExtras(item) {

        if (item.note) {

            this.ticket.raw(
                `     * ${item.note}`
            );

        }

        if (Number(item.discount) > 0) {

            this.ticket.raw(
                `     Descuento: ${MoneyHelper.currency(item.discount)}`
            );

        }

    }

}