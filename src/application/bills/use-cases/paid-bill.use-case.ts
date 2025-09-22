import { BillRepository } from "../../../domain/bills/repository/bill.repository";

export class PaidBill {
    constructor(private repository: BillRepository) { }
    execute(idBill: string) {
        return this.repository.payBill(idBill);
    }
} 