import { Pagination } from "../../../domain/common/pagination";
import { ProviderEntity } from "../../../domain/providers";
import { ProviderRepository } from "../../../domain/providers/repository/provider.repository";
import { ShowAllProviderUseCase } from "../../../domain/providers/use-cases/show-all-provider.use-case";

export class ShowAllProvider implements ShowAllProviderUseCase {
    constructor(private repository: ProviderRepository) { }
    async execute(pagination: Pagination): Promise<[ProviderEntity[], number]> {
        return this.repository.showAll(pagination);
    }
}