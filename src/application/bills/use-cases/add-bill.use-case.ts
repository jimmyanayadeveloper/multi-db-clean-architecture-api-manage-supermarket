import { Bill } from "../../../domain/bills/bill.entity";
import { BillRepository } from "../../../domain/bills/bill.repository";

export class AddBill {
    constructor(private repository: BillRepository) { }
    execute(bill: Bill): Bill {
        return this.repository.addAllBill(bill);
    }
}