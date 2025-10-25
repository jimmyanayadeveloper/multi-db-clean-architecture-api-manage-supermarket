import { CreateProviderUseCase } from "../../../domain/providers/use-cases/create-provider.use-case";
import { ProviderDomainService } from "../../../domain/providers/services/provider-domain.service";
import { ProviderEntity, RegisterProviderDto, } from "../../../domain/providers";
import { ProviderRepository } from "../../../domain/providers/repository/provider.repository";

import { ProviderAssembler } from "../assemblers/provider.assebler";

export class CreateProvider implements CreateProviderUseCase {
    constructor(private readonly repository: ProviderRepository) { }
    async execute(dto: RegisterProviderDto): Promise<ProviderEntity> {
        await ProviderDomainService.uniqueNit(this.repository, dto.nit);
        await ProviderDomainService.uniqueName(this.repository, dto.name);
        const newProvider = ProviderAssembler.fromDtoToEntity(dto);
        return await this.repository.create(newProvider);
    }
}