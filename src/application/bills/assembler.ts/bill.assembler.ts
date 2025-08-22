import { BillEntity } from "../../../domain/bills/entities/bill.entity";
import { RegisterBillDto } from "../dto/register-bill.dto";

export class BillAssembler {
    static fromDtoToEntity(dto: RegisterBillDto, id: string = ''): BillEntity {
        return new BillEntity(
            id,
            dto.providerId,
            dto.numberBill,
            dto.amountBill,
            dto.dateIn,
            dto.payDate,
            dto.isPaid
        )
    }
}