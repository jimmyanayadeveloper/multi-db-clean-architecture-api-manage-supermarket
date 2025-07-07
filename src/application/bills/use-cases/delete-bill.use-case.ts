import { BillRepository } from "../../../domain/bills/bill.repository";

export class DeleteBill {
    constructor(private repository: BillRepository) { }
    execute(numberId: string) {
        return this.repository.delete(numberId);
    }
} 