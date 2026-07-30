import WrapHelper from '../helpers/WrapHelper.js';
import MoneyHelper from '../helpers/MoneyHelper.js';

import ProductPrinter from '../components/ProductPrinter.js';
import HeaderPrinter from '../components/HeaderPrinter.js';
import DocumentPrinter from '../components/DocumentPrinter.js';
import CustomerPrinter from '../components/CustomerPrinter.js';
import SummaryPrinter from '../components/SummaryPrinter.js';
import TotalsPrinter from '../components/TotalsPrinter.js';
import PaymentPrinter from '../components/PaymentPrinter.js';
import FooterPrinter from '../components/FooterPrinter.js';

export default class BaseTicket {

    constructor(printer, layout) {

        this.printer = printer;
        this.layout = layout;

        this.width = layout.width;

        this.indent = ' '.repeat(
            layout.indent ?? 3
        );

        this.initializeComponents();

    }

    initializeComponents() {

        this.header = new HeaderPrinter(this);

        this.document = new DocumentPrinter(this);

        this.customer = new CustomerPrinter(this);

        this.products = new ProductPrinter(this);

        this.summary = new SummaryPrinter(this);

        this.totals = new TotalsPrinter(this);

        this.payment = new PaymentPrinter(this);

        this.footer = new FooterPrinter(this);

    }

    line(char = '-') {

        char = String(char).charAt(0) || '-';

        this.printer.println(
            char.repeat(this.width)
        );

    }

    doubleLine() {

        this.line('=');

    }

    blank(lines = 1) {

        while (lines-- > 0) {
            this.printer.newLine();
        }

    }

    left(text = '') {

        WrapHelper
            .wrap(text, this.width)
            .forEach(line => this.printer.println(line));

    }

    center(text = '') {

        this.printer.alignCenter();

        WrapHelper
            .wrap(text, this.width)
            .forEach(line => this.printer.println(line));

        this.printer.alignLeft();

    }

    right(text = '') {

        this.printer.alignRight();

        WrapHelper
            .wrap(text, this.width)
            .forEach(line => this.printer.println(line));

        this.printer.alignLeft();

    }

    title(text = '') {

        this.printer.alignCenter();
        this.printer.bold(true);
        this.printer.setTextDoubleHeight();

        WrapHelper
            .wrap(text, this.width)
            .forEach(line => this.printer.println(line));

        this.printer.setTextNormal();
        this.printer.bold(false);
        this.printer.alignLeft();

    }

    subtitle(text = '') {

        this.printer.alignCenter();
        this.printer.bold(true);

        WrapHelper
            .wrap(text, this.width)
            .forEach(line => this.printer.println(line));

        this.printer.bold(false);
        this.printer.alignLeft();

    }

    section(title = '') {

        this.line();

        this.subtitle(title);

        this.line();

    }

    field(label, value = '') {

        this.bold(true);

        this.left(`${label}:`);

        this.bold(false);

        WrapHelper
            .wrap(
                String(value),
                this.width - this.indent.length
            )
            .forEach(line => {

                this.left(this.indent + line);

            });

    }

    block(label, value = '') {

        if (!value)
            return;

        this.bold(true);

        this.left(label);

        this.bold(false);

        WrapHelper
            .wrap(
                String(value),
                this.width
            )
            .forEach(line => this.left(line));

        this.blank();

    }

    keyValue(label, value = '') {

        value = String(value);

        const maxLabelWidth = Math.max(
            1,
            this.width - value.length - 1
        );

        label = String(label)
            .slice(0, maxLabelWidth);

        const spaces = Math.max(
            1,
            this.width - label.length - value.length
        );

        this.left(
            label +
            ' '.repeat(spaces) +
            value
        );

    }

    money(label, value) {

        this.keyValue(
            label,
            MoneyHelper.currency(value)
        );

    }

    list(items = []) {

        items.forEach(item => {

            this.left(item);

        });

    }

    message(text = '') {

        if (!text)
            return;

        this.blank();

        this.center(text);

    }

    qr(value) {

        if (!value)
            return;

        const qr = this.layout.qr ?? {};

        this.blank();

        this.printer.alignCenter();

        this.printer.printQR(value, {

            cellSize: qr.cellSize ?? 5,

            correction: qr.correction ?? 'M'

        });

        this.printer.alignLeft();

    }

    normal() {

        this.printer.setTextNormal();

    }

    bold(enable = true) {

        this.printer.bold(enable);

    }

    doubleHeight() {

        this.printer.setTextDoubleHeight();

    }

    cut() {

        this.printer.cut();

    }

    async execute(cut = true) {

        if (cut) {

            this.cut();

        }

        await this.printer.execute();

    }

}