export default class MoneyHelper {

    static LOCALE = 'en-US';

    static number(value) {

        const number = Number(value);

        return Number.isFinite(number)
            ? number
            : 0;

    }

    static format(value = 0, decimals = 2) {

        value = this.number(value);

        return value.toLocaleString(
            this.LOCALE,
            {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }
        );

    }

    static currency(value = 0) {

        return `$${this.format(value)}`;

    }

    static quantity(value = 0) {

        return this.format(value, 0);

    }

}