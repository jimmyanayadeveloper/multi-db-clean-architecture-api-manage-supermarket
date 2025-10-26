import { BillRepository } from "../../../domain/bills/repository/bill.repository";
import { GetAllBillsUseCase } from "../../../domain/bills/use-cases/get-all-bills.use-case";
import { Pagination } from "../../../domain/common/pagination";

export class GetAllBills implements GetAllBillsUseCase {
    constructor(private repository: BillRepository) { }
    async execute(pagination: Pagination) {
        return await this.repository.showAllBill(pagination);
    }
}