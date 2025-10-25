import { CustomError } from "../../../domain";
import { DeleteProviderUseCase } from "../../../domain/providers/use-cases/delete.provider.use-case";
import { ProviderRepository } from "../../../domain/providers/repository/provider.repository";

import { InputNormalizerOrFail } from "../../../shared/helpers/input-normalizer-or-fail.helper";

export class DeleteProvider implements DeleteProviderUseCase {
    constructor(private repository: ProviderRepository) { }
    async execute(id: string) {
        InputNormalizerOrFail.uuid(id, 'Find provider by id');
        const providerFoundById = await this.repository.findById(id);
        if (!providerFoundById) throw CustomError.notFound("Provider to update was not found in the datasource");
        return this.repository.inactivate(id);
    }
}