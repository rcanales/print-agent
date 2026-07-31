export default class FakePrinter {

    constructor(width = 48) {

        this.width = width;

        this.lines = [];

        this.align = 'left';
        this.boldEnabled = false;
        this.doubleHeightEnabled = false;

    }

    println(text = '') {

        text = String(text);

        switch (this.align) {

            case 'center':
                text = this.center(text);
                break;

            case 'right':
                text = text.padStart(this.width);
                break;

        }

        if (this.boldEnabled) {
            text = `**${text}**`;
        }

        if (this.doubleHeightEnabled) {
            text = `## ${text}`;
        }

        this.lines.push(text);

    }

    newLine() {

        this.lines.push('');

    }

    alignLeft() {

        this.align = 'left';

    }

    alignCenter() {

        this.align = 'center';

    }

    alignRight() {

        this.align = 'right';

    }

    bold(enable = true) {

        this.boldEnabled = enable;

    }

    setTextDoubleHeight() {

        this.doubleHeightEnabled = true;

    }

    setTextNormal() {

        this.doubleHeightEnabled = false;

    }

    printQR(value) {

        this.newLine();

        this.lines.push('========== QR ==========');
        this.lines.push(value);
        this.lines.push('========================');

        this.newLine();

    }

    cut() {

        this.lines.push('-'.repeat(this.width));
        this.lines.push('[CORTE]');
        this.lines.push('-'.repeat(this.width));

    }

    async execute() {

        console.clear();

        console.log(this.output());

    }

    output() {

        return this.lines.join('\n');

    }

    clear() {

        this.lines = [];

    }

    center(text) {

        if (text.length >= this.width) {
            return text;
        }

        const padding = Math.floor(
            (this.width - text.length) / 2
        );

        return ' '.repeat(padding) + text;

    }

}