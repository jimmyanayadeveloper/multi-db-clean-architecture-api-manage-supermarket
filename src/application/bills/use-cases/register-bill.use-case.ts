import { CustomError } from "../../../domain";
import { BillEntity } from "../../../domain/bills/entities/bill.entity";
import { BillRepository } from "../../../domain/bills/repository/bill.repository";
import { RegisterBillDto } from "../../../infrastructure/bills/controllers/dto/request/register-bill.dto";
import { BillAssembler } from "../assembler.ts/bill.assembler";

export class RegisterBill {
    constructor(private readonly repository: BillRepository) { }
    async execute(dto: RegisterBillDto): Promise<BillEntity | null> {
        const billFound = await this.repository.findByNumberBillAndProvider(dto.numberBill, dto.provider.id);
        if (billFound) throw CustomError.conflict('Bill already exists in this provider');
        const newBill = BillAssembler.fromDtoToEntity(dto);
        return await this.repository.register(newBill);
    }
}