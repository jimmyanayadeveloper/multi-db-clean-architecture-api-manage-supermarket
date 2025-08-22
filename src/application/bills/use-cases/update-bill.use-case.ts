import { UpdateBillData } from "../../../domain/bills/dto/update-bill.dto";
import { BillEntity } from "../../../domain/bills/entities/bill.entity";
import { BillRepository } from "../../../domain/bills/repository/bill.repository";

export class UpdateBill {
    constructor(private repository: BillRepository) { }
    async execute(numberId: string, billUpdate: UpdateBillData): Promise<BillEntity | null> {
        return this.repository.edit(numberId, billUpdate.changes);
    }
}