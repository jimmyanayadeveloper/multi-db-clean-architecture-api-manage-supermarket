
import { CustomError } from "../../../domain";
import { ProviderEntity } from "../../../domain/providers";
import { ProviderRepository } from '../../../domain/providers/repository/provider.repository';


export class UpdateProvider {
    constructor(private providerRepository: ProviderRepository) { }
    async execute(id: string, changesProvider: ProviderEntity): Promise<ProviderEntity> {
        const providerUpdated = await this.providerRepository.edit(id, changesProvider);
        if (!providerUpdated) throw CustomError.notFound('Provider not found');
        return providerUpdated
    }
}