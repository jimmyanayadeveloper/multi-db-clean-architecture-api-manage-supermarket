
import { CustomError } from "../../../domain";
import { BillEntity } from "../../../domain/bills/entities/bill.entity";
import { BillRepository } from "../../../domain/bills/repository/bill.repository";
import { BillAssembler } from "../assembler.ts/bill.assembler";
import { RegisterBillDto } from "../dto/register-bill.dto";

export class RegisterBill {
    constructor(private readonly repository: BillRepository) { }

    async execute(dto: RegisterBillDto): Promise<BillEntity> {
        const bill = await this.repository.findByNumberBillAndProvider(dto.numberBill, dto.providerId);
        if (bill) throw CustomError.conflict('Bill already exists in this provider');
        const billRegister = BillAssembler.fromDtoToEntity(dto);
        return await this.repository.register(billRegister);
    }
}