import BaseTemplate from './BaseTemplate.js';

export default class ElectronicInvoiceTemplate extends BaseTemplate {

    async print(data = {}) {

        await this.logo();

        this.header(data);

        this.customer(data);

        this.products(data);

        this.totals(data);

        this.payment(data);

        this.document(data);

        this.footer(data);

    }

}