import { BillRepository } from "../../../domain/bills/repository/bill.repository";


export class GetBillByNumberID {
    constructor(private repository: BillRepository) { }

    async execute(numberBillId: string) {
        return await this.repository.findByNumber(numberBillId);
    }

}