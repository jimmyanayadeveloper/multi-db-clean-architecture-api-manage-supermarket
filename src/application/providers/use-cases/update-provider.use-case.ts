
import { CustomError } from "../../../domain";
import { ProviderDomainService, ProviderEntity } from "../../../domain/providers";
import { ProviderRepository } from '../../../domain/providers/repository/provider.repository';
import { UpdateProviderUseCase } from "../../../domain/providers/use-cases/update-provider.use-case";

import { UpdateProviderDto } from "../dto/update-provider-dto";

export class UpdateProvider implements UpdateProviderUseCase {
    constructor(private repository: ProviderRepository) { }
    async execute(id: string, changesProvider: UpdateProviderDto): Promise<ProviderEntity | null> {
        const providerFoundById = await this.repository.findById(id);
        if (!providerFoundById) throw CustomError.notFound("Provider to update was not found in the datasource");

        const { name, nit } = changesProvider.updateProviderData;
        if (name) await ProviderDomainService.uniqueName(this.repository, name);
        if (nit) await ProviderDomainService.uniqueNit(this.repository, nit);

        const providerChanges = ProviderEntity.update(providerFoundById!, changesProvider.updateProviderData);
        const providerUpdated = await this.repository.edit(providerChanges);
        if (!providerUpdated) throw CustomError.notFound("Provider was not updated with success");
        return providerUpdated;
    }
}