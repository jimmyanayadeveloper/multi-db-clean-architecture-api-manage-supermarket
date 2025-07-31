import { ProviderEntity } from "../../../domain/providers";
import { ProviderRepository } from "../../../domain/providers/repository/provider.repository";
import { FindByTermUseCase } from "../../../domain/providers/use-cases/find-by-term.use-case";


export class ProviderByTerm implements FindByTermUseCase {
    constructor(private repository: ProviderRepository) { }
    execute(term: string): Promise<ProviderEntity[]> {
        return this.repository.findByTerm(term)
    }
}