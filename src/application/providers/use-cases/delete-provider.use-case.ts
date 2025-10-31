import { CustomError } from "../../../domain";
import { DeleteProviderUseCase } from "../../../domain/providers/use-cases/delete.provider.use-case";
import { ProviderRepository } from "../../../domain/providers/repository/provider.repository";

export class DeleteProvider implements DeleteProviderUseCase {
    constructor(private repository: ProviderRepository) { }
    async execute(id: string) {
        const providerFoundById = await this.repository.findById(id);
        if (!providerFoundById) throw CustomError.notFound("Provider to update was not found in the datasource");
        return this.repository.inactivate(id);
    }
}