import { CustomError } from '../../../domain';
import { RegisterProviderRequest } from '../../../domain/providers/interfaces/dto/RegisterProviderRequest';
import { DeepSanitizer } from '../../../shared/helpers/deep-sanitizer.helper';
import { InputNormalizer } from '../../../shared/helpers/input-normalizer.helper';

export class UpdateProviderDto {

    public readonly updateProviderData: Partial<RegisterProviderRequest>;

    constructor(data: Partial<RegisterProviderRequest>) {
        this.updateProviderData = data;
    }

    static create(changes: Partial<RegisterProviderRequest>): UpdateProviderDto {
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
            if (Object.keys(sanitizedChangesObj).length === 0) throw CustomError.badRequest("No exist data to change to update")
            return new UpdateProviderDto(sanitizedChangesObj)

        } catch (error) {
            throw CustomError.badRequest("Invalid data provided in update provider")
        }
    }
}