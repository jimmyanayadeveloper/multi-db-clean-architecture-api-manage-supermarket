import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { DtoResult } from "../interfaces/response-dto";
import { CustomError } from "../../../domain";
import { InputNormalizerOrFail } from "../../../shared/helpers/input-normalizer-or-fail.helper";

export class GetBillByIdEntityDto {

    constructor(public readonly id: string) { }

    static create(id: string): DtoResult<GetBillByIdEntityDto> {
        try {
            if (!id) throw CustomError.badRequest(`id bill is required`);
            const idBillEntity = InputNormalizerOrFail.str(id, 'Id entity bill');

            if (!uuidValidate(idBillEntity)) throw CustomError.badRequest('Format bill id is wrong be must UUID');
            return { ok: true, value: new GetBillByIdEntityDto(idBillEntity) }

        } catch (error) {
            const err = error instanceof CustomError ? error : CustomError.badRequest('Invalidated data bill');
            return { ok: false, error: err }
        }
    }
}