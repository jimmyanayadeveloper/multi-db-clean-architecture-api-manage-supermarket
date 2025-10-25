import { CustomError } from "../../../domain";
import { FindByTermUseCase } from "../../../domain/providers/use-cases/find-by-term.use-case";
import { ProviderEntity } from "../../../domain/providers";
import { ProviderRepository } from "../../../domain/providers/repository/provider.repository";

import { InputNormalizerOrFail } from '../../../shared/helpers/input-normalizer-or-fail.helper';

export class ProviderByTerm implements FindByTermUseCase {
    constructor(private repository: ProviderRepository) { }
    async execute(term: string): Promise<ProviderEntity[]> {
        const searchTerm = InputNormalizerOrFail.str(term, 'Find provider by term');
        const providersMatchToTerm = await this.repository.findByTerm(searchTerm)
        if (providersMatchToTerm.length == 0) throw CustomError.notFound(`Providers not found in bd by term ${term}`);
        return providersMatchToTerm;
    }
}