import { CustomError } from "../../../../domain";
import { BillEntity } from "../../../../domain/bills/entities/bill.entity";
import { RegisterBillData } from '../../interfaces/dto/request/register.dto';
import { UpdateBillData } from "../../interfaces/dto/request/update.dto";
import { DtoResult } from "../../interfaces/response-dto";

export class UpdateBillDto {

    public readonly updateBillData: Partial<RegisterBillData>

    constructor(data: Partial<RegisterBillData>) {
        this.updateBillData = data
    }

    static create(changes: Partial<BillEntity>): DtoResult<UpdateBillDto> {

        if (!changes || Object.keys(changes).length === 0)
            return { ok: false, error: CustomError.badRequest('No exist update data to change') }

        const updateData: UpdateBillData = {
            provider: changes.provider ?? undefined,
            numberBill: changes.numberBill ?? undefined,
            amountBill: changes.amountBill ?? undefined,
            dateIn: changes.dateIn ?? undefined,
            payDate: changes.datePaid ?? undefined
        }

        const sanitizedChangesObj = Object.fromEntries(
            Object.entries(updateData).filter(([__, value]) => value != null)
        )

        if (Object.keys(sanitizedChangesObj).length === 0)
            return { ok: false, error: CustomError.badRequest("No exist data to updated") }

        return { ok: true, value: new UpdateBillDto(sanitizedChangesObj) }
    }
}
