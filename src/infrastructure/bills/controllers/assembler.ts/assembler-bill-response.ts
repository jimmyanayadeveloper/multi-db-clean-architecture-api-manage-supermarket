import { BillMinResponse } from "../../../../application/bills/interfaces/dto/response/response.dto"
import { BillEntity } from "../../../../domain/bills/entities/bill.entity"

export class BillResponseAssembler {
    static toResponse(entity: BillEntity | null): BillMinResponse | null {
        if (!entity) return null
        return {
            providerName: entity.provider.name,
            numberBill: entity.numberBill,
            amount: entity.amountBill
        }
    }
}