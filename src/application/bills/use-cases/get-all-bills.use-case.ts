import { BillRepository } from "../../../domain/bills/repository/bill.repository";
import { Pagination } from "../../../domain/common/pagination";

export class GetAllBills {
    constructor(private repository: BillRepository) { }
    async execute(pagination: Pagination) {
        return await this.repository.showAllBill(pagination);
    }
}