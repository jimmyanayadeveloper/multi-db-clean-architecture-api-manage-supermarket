import { CustomError } from "../../../domain";
import { FindProviderByNameUseCase } from "../../../domain/providers/use-cases/find-by-name.use-case";
import { ProviderEntity, ProviderRepository } from "../../../domain/providers";

import { InputNormalizerOrFail } from "../../../shared/helpers/input-normalizer-or-fail.helper";

export class GetProviderByName implements FindProviderByNameUseCase {
    constructor(private readonly repository: ProviderRepository) { }
    async execute(name: string): Promise<ProviderEntity> {
        const nameValidade = InputNormalizerOrFail.str(name, 'Find provider by name');
        const provider = await this.repository.findByName(nameValidade);
        if (!provider) throw CustomError.notFound('Provider not found in bd')
        return provider
    }
}