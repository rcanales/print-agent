import BaseTemplate from './BaseTemplate.js';

export default class CashClosingTemplate extends BaseTemplate {

    print(data = {}) {

        this.header(data);

        this.document(data);

        this.summary(data);

        this.footer(data);

    }

}