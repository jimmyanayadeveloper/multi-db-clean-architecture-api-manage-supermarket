import { BillEntity } from "../../../domain/bills/entities/bill.entity";
import { RegisterBillDto } from "../dto/register-bill.dto";

export class BillAssembler {
    static fromDtoToEntity(dto: RegisterBillDto, id: string = ''): BillEntity {
        return BillEntity.create({
            id: '',
            provider: { id: dto.provider.id, name: dto.provider.name },
            numberBill: dto.numberBill,
            amountBill: dto.amountBill,
            dateIn: dto.dateIn,
            datePaid: dto.payDate,
            isPaid: dto.isPaid
        }
        )
    }
}