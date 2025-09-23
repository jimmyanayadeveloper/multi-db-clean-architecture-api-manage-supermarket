import { v4 as uuidv4, validate as uuidValidate } from "uuid";

import { CustomError } from '../../../../domain';
import { DtoResult } from '../../interfaces/response-dto';

export class FindBillByIdDto {

    constructor(public readonly id: string) { }

    static create(id: string): DtoResult<FindBillByIdDto> {
        if (!id || typeof id !== 'string' || !uuidValidate(id)) {
            return { ok: false, error: CustomError.badRequest(`Invalid or missing UUID`) }
        }
        return { ok: true, value: new FindBillByIdDto(id.trim()) }
    }
}