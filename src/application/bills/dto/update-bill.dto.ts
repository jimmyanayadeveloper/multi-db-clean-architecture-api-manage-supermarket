import { CustomError } from "../../../domain";
import { BillEntity } from "../../../domain/bills/entities/bill.entity";
import { DeepSanitizer } from "../../../shared/helpers/deep-sanitizer.helper";
import { InputNormalizer } from "../../../shared/helpers/input-normalizer.helper";
import { RegisterBillData } from "../interfaces/dto/request/register.dto";
import { UpdateBillData } from "../interfaces/dto/request/update.dto";
import { DtoResult } from "../interfaces/response-dto";

export class UpdateBillDto {

    public readonly updateBillData: Partial<RegisterBillData>

    constructor(data: Partial<RegisterBillData>) {
        this.updateBillData = data
    }

    static create(changes: Partial<BillEntity>): DtoResult<UpdateBillDto> {

        try {
            if (!changes || Object.keys(changes).length === 0)
                return { ok: false, error: CustomError.badRequest('No exist update data to change') }

            const updateData: UpdateBillData = {
                provider: { id: InputNormalizer.str(changes.provider?.id), name: InputNormalizer.str(changes.provider?.name) },
                numberBill: InputNormalizer.str(changes.numberBill),
                amountBill: InputNormalizer.num(changes.amountBill),
                dateIn: InputNormalizer.date(changes.dateIn),
                payDate: InputNormalizer.date(changes.datePaid)
            }

            const sanitizedChangesObj = DeepSanitizer.sanitize(updateData);

            if (Object.keys(sanitizedChangesObj).length === 0)
                return { ok: false, error: CustomError.badRequest("No exist data to update") }

            return { ok: true, value: new UpdateBillDto(sanitizedChangesObj as RegisterBillData) }

        } catch (error) {
            const err = error instanceof CustomError ? error : CustomError.badRequest("Invalid data provided in update bill ")
            return { ok: false, error: err }
        }
    }
}

