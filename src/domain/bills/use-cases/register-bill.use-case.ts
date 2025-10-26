import { RegisterBillDto } from "../../../application/bills/dto/register-bill.dto";
import { BillEntity } from "../entities/bill.entity";

export interface RegisterBillUseCase {
    execute(dto: RegisterBillDto): Promise<BillEntity>
}