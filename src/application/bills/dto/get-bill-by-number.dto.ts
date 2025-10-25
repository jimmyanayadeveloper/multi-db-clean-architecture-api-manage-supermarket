import { CustomError } from "../../../domain";
import { DtoResult } from "../interfaces/response-dto";
import { InputNormalizerOrFail } from "../../../shared/helpers/input-normalizer-or-fail.helper";

export class GetBillByNumberIdBillDto {
    public readonly id: string
    private constructor(id: string) {
        this.id = id;
    }
    static create(idParams: string): DtoResult<GetBillByNumberIdBillDto> {
        try {
            const id = (InputNormalizerOrFail.str(idParams, "Find id bill "));
            return { ok: true, value: new GetBillByNumberIdBillDto(id) }
        } catch (error) {
            const err = error instanceof CustomError ? error : CustomError.badRequest("Invalid data provided");
            return { ok: false, error: err }
        }
    }
}