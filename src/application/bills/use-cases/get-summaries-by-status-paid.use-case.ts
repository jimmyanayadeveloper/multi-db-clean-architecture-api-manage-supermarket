import { BillRepository } from "../../../domain/bills/repository/bill.repository";


export class GetSummariesBillByStatusPaid {
    constructor(private repository: BillRepository) { }
    async execute(provider?: string) {
        return await this.repository.getSummaryBillsSlipByPaidStatus(provider);
    }
}