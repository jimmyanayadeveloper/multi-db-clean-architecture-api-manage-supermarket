
import { BillEntity } from "../../../../../domain/bills/entities/bill.entity";
import { BillMinResponse } from "../../../../../domain/bills/interfaces/dto/response/response.dto";

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