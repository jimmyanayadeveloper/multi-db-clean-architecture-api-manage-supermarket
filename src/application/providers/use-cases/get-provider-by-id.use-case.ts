import { CustomError } from "../../../domain";
import { ProviderEntity } from "../../../domain/providers";
import { ProviderRepository } from '../../../domain/providers/repository/provider.repository';



export class GetProviderById {

    constructor(private readonly providerRepository: ProviderRepository) { }

    async execute(id: string): Promise<ProviderEntity> {
        const provider = await this.providerRepository.findById(id);
        if (!provider) throw CustomError.notFound('Provider not found in bd');
        return provider
    }
}