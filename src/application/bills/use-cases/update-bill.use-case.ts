import { Bill } from "../../../domain/bills/bill.entity";
import { BillRepository } from "../../../domain/bills/bill.repository";

export class UpdateBill {
    constructor(private repository: BillRepository) { }
    execute(numberId: string, billUpdate: Partial<Bill>): Bill | null {
        return this.repository.update(numberId, billUpdate)
    }
}