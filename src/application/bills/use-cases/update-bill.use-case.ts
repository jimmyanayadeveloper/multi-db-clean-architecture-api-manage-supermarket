import { BillDomainService } from "../../../domain/bills/services/bill-domain.service";
import { BillEntity } from "../../../domain/bills/entities/bill.entity";
import { BillRepository } from "../../../domain/bills/repository/bill.repository";
import { CustomError } from "../../../domain";
import { UpdateBillUseCase } from "../../../domain/bills/use-cases/update-bill.use-case";

export class UpdateBill implements UpdateBillUseCase {
    constructor(private repository: BillRepository) { }
    async execute(billId: string, billUpdate: Partial<BillEntity>): Promise<BillEntity> {
        const billFoundById = await this.repository.findById(billId);
        if (!billFoundById) throw CustomError.notFound("Bill to update was no found in the datasource");
        const billUpdatedEntity = BillEntity.update(billFoundById, billUpdate);
        await BillDomainService.uniqueIdBill(this.repository, billUpdatedEntity.numberBill, billUpdatedEntity.provider.id);
        const billUpdatedInDatasource = await this.repository.edit(billUpdatedEntity)
        if (!billUpdatedInDatasource) throw CustomError.badRequest("Bill not updated")
        return billUpdatedInDatasource;
    }
}
