
import { CustomError } from "../../../domain";
import { CreateProviderDto, CreateProviderUseCase, ProviderEntity, } from "../../../domain/providers";
import { ProviderRepository } from "../../../domain/providers/repository/provider.repository";


export class CreateProvider implements CreateProviderUseCase {

    constructor(private readonly providerRepository: ProviderRepository) { }

    async execute(dto: CreateProviderDto): Promise<ProviderEntity> {
        const provider = await this.providerRepository.findByNit(dto.nit);
        if (provider) throw CustomError.conflict('Provider already exists')
        const providerCreate = await this.providerRepository.create(dto);
        return providerCreate;
    }
}