import { CustomError } from "../../../domain";
import { BillEntity } from "../../../domain/bills/entities/bill.entity";
import { DeepSanitizer } from "../../../shared/helpers/deep-sanitizer.helper";
import { InputNormalizer } from "../../../shared/helpers/input-normalizer.helper";
import { RegisterBillRequest } from "../../../domain/bills/interface/dto/update-bill-request.interface";

export class UpdateBillDto {

    public readonly updateBillData: Partial<BillEntity>

    constructor(data: Partial<BillEntity>) {
        this.updateBillData = data
    }

    static create(changes: Partial<RegisterBillRequest>): UpdateBillDto {

        try {
            if (!changes || Object.keys(changes).length === 0) throw CustomError.badRequest('No exist update data to change')

            const updateData: Partial<BillEntity> = {
                numberBill: InputNormalizer.str(changes.numberBill),
                amountBill: InputNormalizer.num(changes.amountBill),
                dateIn: InputNormalizer.date(changes.dateIn),
            }

            const sanitizedChangesObj = DeepSanitizer.sanitize(updateData);

            if (Object.keys(sanitizedChangesObj).length === 0) throw CustomError.badRequest("No exist data to update");
            return new UpdateBillDto(sanitizedChangesObj as Partial<BillEntity>);
        } catch (error) {
            throw CustomError.badRequest("Invalid data provided in update bill " + error);
        }
    }
}

