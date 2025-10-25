import { BillEntity } from "../../../domain/bills/entities/bill.entity";
import { RegisterBillData } from "../interfaces/dto/request/register.dto";
import { BillRepository } from "../../../domain/bills/repository/bill.repository";
import { CustomError } from "../../../domain";

export class UpdateBill {
    constructor(private repository: BillRepository) { }
    async execute(billId: string, billUpdate: Partial<RegisterBillData>): Promise<BillEntity | null> {
        const billFoundById = await this.repository.findById(billId);
        if (!billFoundById) throw CustomError.notFound("Bill to update was no found in the datasource");
        const billUpdatedEntity = BillEntity.update(billFoundById, billUpdate);
        console.log({ billUpdatedEntity });
        const billUpdatedDatasource = await this.repository.edit(billUpdatedEntity)
        return billUpdatedDatasource
        /* return this.repository.edit(billId, billUpdate); */
    }
}