import { CustomError } from "../../../domain";
import { FindProviderByNitUseCase } from "../../../domain/providers/use-cases/find-by-nit.use-case";
import { ProviderEntity, ProviderRepository } from "../../../domain/providers";

import { InputNormalizerOrFail } from "../../../shared/helpers/input-normalizer-or-fail.helper";

export class GetProviderByNit implements FindProviderByNitUseCase {
    constructor(private readonly repository: ProviderRepository) { }
    async execute(nit: string): Promise<ProviderEntity> {
        const nitValidade = InputNormalizerOrFail.int(nit, 'Find provider by nit').toString();
        const provider = await this.repository.findByNit(nitValidade);
        if (!provider) throw CustomError.notFound(`Provider not foutn in bd using this nit ${nitValidade}`);
        return provider;
    }
}