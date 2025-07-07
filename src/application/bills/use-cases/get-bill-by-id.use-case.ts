import { BillRepository } from "../../../domain/bills/bill.repository";


export class GetBillByNumberID {
    constructor(private repository: BillRepository) { }

    execute(numberBillId: string) {
        return this.repository.findByNumber(numberBillId);
    }

}