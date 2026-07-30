export default class PrintJobsApi {

    constructor(apiService) {
        this.api = apiService;
    }

    async getPendingJobs() {
        const response = await this.api.request(
            'get',
            '/printer/jobs/pending'
        );

        return response.data ?? [];
    }

    async markPrinted(jobId) {
        await this.api.request(
            'post',
            `/printer/jobs/${jobId}/printed`
        );
    }

    async markFailed(jobId, error) {
        await this.api.request(
            'post',
            `/printer/jobs/${jobId}/failed`,
            {
                error
            }
        );
    }

}