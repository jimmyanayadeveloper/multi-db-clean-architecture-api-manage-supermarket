import { BillDomainService } from "../../../domain/bills/services/bill-domain.service";
import { BillEntity } from "../../../domain/bills/entities/bill.entity";
import { BillRepository } from "../../../domain/bills/repository/bill.repository";
import { RegisterBillDto } from "../dto/register-bill.dto";
import { BillAssembler } from "../assemblers/bill.assembler";
import { RegisterBillUseCase } from "../../../domain/bills/use-cases/register-bill.use-case";
import { ProviderRepository } from '../../../domain/providers/repository/provider.repository';

export class RegisterBill {
    constructor(private readonly repository: BillRepository, private readonly repositoryProvider: ProviderRepository) { }
    async execute(dto: RegisterBillDto): Promise<BillEntity | null> {
        await BillDomainService.uniqueIdBill(this.repository, dto.numberBill, dto.provider.id);
        await BillDomainService.allowsCredit(this.repositoryProvider, dto.provider.id, dto.creditDays)
        const newBill = BillAssembler.fromDtoToEntity(dto);
        return await this.repository.register(newBill);
    }
}