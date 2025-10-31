import { CustomError } from "../../../domain";
import { FindProviderById } from "../../../domain/providers/use-cases/find-provider-by-id.use-case";
import { ProviderEntity } from "../../../domain/providers";
import { ProviderRepository } from '../../../domain/providers/repository/provider.repository';

export class GetProviderById implements FindProviderById {
    constructor(private readonly providerRepository: ProviderRepository) { }
    async execute(id: string): Promise<ProviderEntity> {
        const provider = await this.providerRepository.findById(id);
        if (!provider) throw CustomError.notFound('Provider not found in bd');
        return provider
    }
}