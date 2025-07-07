import { BillRepository } from "../../../domain/bills/bill.repository";


export class GetAllBills {
    constructor(private repository: BillRepository) { }

    execute() {
        return this.repository.getAllBill();
    }
}