import { BillEntity } from "../../../domain/bills/entities/bill.entity";
import { RegisterBillData } from "../interfaces/dto/request/register.dto";
import { BillRepository } from "../../../domain/bills/repository/bill.repository";

export class UpdateBill {
    constructor(private repository: BillRepository) { }
    async execute(billId: string, billUpdate: Partial<RegisterBillData>): Promise<BillEntity | null> {
        return this.repository.edit(billId, billUpdate);
    }
}