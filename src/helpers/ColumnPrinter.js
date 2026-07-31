import WrapHelper from './WrapHelper.js';

export default class ColumnPrinter {

    constructor(ticket) {
        this.ticket = ticket;
    }

    /**
     * Imprime una fila compuesta por múltiples columnas.
     *
     * @param {Array} columns
     */
    printRow(columns = []) {

        const normalizedColumns = columns.map(column => ({
            text: String(column.text ?? ''),
            width: Math.max(1, Number(column.width) || 1),
            align: column.align ?? 'left'
        }));

        const wrappedColumns = normalizedColumns.map(column =>
            WrapHelper.wrap(
                column.text,
                column.width
            )
        );

        const maxLines = Math.max(
            ...wrappedColumns.map(lines => lines.length),
            0
        );

        for (let lineIndex = 0; lineIndex < maxLines; lineIndex++) {

            let line = '';

            normalizedColumns.forEach((column, columnIndex) => {

                const value =
                    wrappedColumns[columnIndex][lineIndex] ?? '';

                line += ColumnPrinter.align(
                    value,
                    column.width,
                    column.align
                );

            });

            this.ticket.left(line);

        }

    }

    /**
     * Imprime múltiples filas.
     *
     * @param {Array[]} rows
     */
    printRows(rows = []) {

        rows.forEach(row => this.printRow(row));

    }

    /**
     * Alinea un texto dentro de un ancho fijo.
     *
     * @param {string} text
     * @param {number} width
     * @param {'left'|'center'|'right'} align
     * @returns {string}
     */
    static align(text, width, align = 'left') {

        text = String(text ?? '').slice(0, width);

        switch (align) {

            case 'right':
                return text.padStart(width);

            case 'center': {

                const left = Math.floor(
                    (width - text.length) / 2
                );

                const right =
                    width - text.length - left;

                return ' '.repeat(left) +
                    text +
                    ' '.repeat(right);

            }

            default:
                return text.padEnd(width);

        }

    }

}