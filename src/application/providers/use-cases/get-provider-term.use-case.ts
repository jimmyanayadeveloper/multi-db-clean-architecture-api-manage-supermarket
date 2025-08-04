import { CustomRepositoryCannotInheritRepositoryError } from "typeorm";
import { ProviderEntity } from "../../../domain/providers";
import { ProviderRepository } from "../../../domain/providers/repository/provider.repository";
import { FindByTermUseCase } from "../../../domain/providers/use-cases/find-by-term.use-case";
import { CustomError } from "../../../domain";


export class ProviderByTerm implements FindByTermUseCase {
    constructor(private repository: ProviderRepository) { }
    async execute(term: string): Promise<ProviderEntity[]> {
        const providersMatchToTerm = await this.repository.findByTerm(term)
        if (providersMatchToTerm.length == 0) throw CustomError.notFound(`Providers not found in bd by term ${term}`);
        return providersMatchToTerm;
    }
}