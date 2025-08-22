import { BillRepository } from "../../../domain/bills/repository/bill.repository";

export class GetBillsByStatus {
    constructor(private repository: BillRepository) { }
    execute(status: string) {
        const statusBill = status === "true" ? true : false;
        return this.repository.showAllBillByStatus(statusBill);
    }
}