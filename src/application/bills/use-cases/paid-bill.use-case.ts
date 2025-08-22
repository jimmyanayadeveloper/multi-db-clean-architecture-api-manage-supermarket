import { BillRepository } from "../../../domain/bills/repository/bill.repository";

export class PaidBill {
    constructor(private repository: BillRepository) { }
    execute(numberId: string, providerId: string) {
        return this.repository.payBill(numberId, providerId);
    }
} 