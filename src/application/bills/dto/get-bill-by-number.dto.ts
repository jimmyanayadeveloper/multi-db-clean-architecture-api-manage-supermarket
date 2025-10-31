import { CustomError } from "../../../domain";
import { InputNormalizerOrFail } from "../../../shared/helpers/input-normalizer-or-fail.helper";

export class GetBillByNumberIdBillDto {
    public readonly idBill: string
    private constructor(id: string) {
        this.idBill = id;
    }
    static create(idParams: string): GetBillByNumberIdBillDto {
        try {
            const id = (InputNormalizerOrFail.str(idParams, "Find id bill "));
            return new GetBillByNumberIdBillDto(id);
        } catch (error) {
            throw CustomError.badRequest("Invalid data provided " + error);
        }
    }
}