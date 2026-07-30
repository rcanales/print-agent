import BaseTemplate from './BaseTemplate.js';

export default class ElectronicInvoiceTemplate extends BaseTemplate {

    print(data = {}) {

        this.header(data);

        this.document(data);

        this.customer(data);

        this.products(data);

        this.totals(data);

        this.payment(data);

        this.footer(data);

    }

}