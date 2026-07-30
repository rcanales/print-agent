import ApiService from '../services/ApiService.js';

import PrintJobsApi from '../services/PrintJobsApi.js';
import PrintService from '../services/PrintService.js';

import PrintWorker from '../jobs/PrintWorker.js';

const apiService = new ApiService();

const printJobsApi = new PrintJobsApi(apiService);
const printService = new PrintService();

const printWorker = new PrintWorker(
    printJobsApi,
    printService
);

export default {

    apiService,

    printJobsApi,

    printService,

    printWorker

};