import { RegisterProviderRequest } from '../dto/interfaces/request/register-provider.dto';
import { DtoResult } from '../../bills/interfaces/response-dto';
import { CustomError } from '../../../domain';
import { DeepSanitizer } from '../../../shared/helpers/deep-sanitizer.helper';
import { InputNormalizer } from '../../../shared/helpers/input-normalizer.helper';

export class UpdateProviderDto {

    public readonly updateProviderData: Partial<RegisterProviderRequest>;

    constructor(data: Partial<RegisterProviderRequest>) {
        this.updateProviderData = data;
    }

    static create(changes: Partial<RegisterProviderRequest>): DtoResult<UpdateProviderDto> {
        try {
            const updateData: Partial<RegisterProviderRequest> = {
                creditBalance: InputNormalizer.num(changes.creditBalance),
                creditDays: InputNormalizer.int(changes.creditDays),
                name: InputNormalizer.str(changes.name),
                nit: InputNormalizer.str(changes.nit?.trim()),
                salesman: InputNormalizer.str(changes.salesman?.toLowerCase().trim()),
                saleWithCredit: InputNormalizer.bool(changes.saleWithCredit),
                withholdingsTaxes: InputNormalizer.bool(changes.withholdingsTaxes),
            }
            const sanitizedChangesObj = DeepSanitizer.sanitize(updateData);
            if (Object.keys(sanitizedChangesObj).length === 0)
                return { ok: false, error: CustomError.badRequest("No exist data to change to update") }
            return { ok: true, value: new UpdateProviderDto(sanitizedChangesObj) };
        } catch (error) {
            const err = error instanceof CustomError ? error : CustomError.badRequest("Invalid data provided in update provider")
            return { ok: false, error: err }
        }
    }
}