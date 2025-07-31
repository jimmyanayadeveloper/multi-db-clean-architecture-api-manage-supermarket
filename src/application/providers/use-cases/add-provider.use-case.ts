
import { CreateProviderDto, CreateProviderUseCase, ProviderEntity, } from "../../../domain/providers";
import { ProviderRepository } from "../../../domain/providers/repository/provider.repository";


export class CreateProvider implements CreateProviderUseCase {

    constructor(private readonly providerRepository: ProviderRepository) { }

    async execute(dto: CreateProviderDto): Promise<ProviderEntity> {
        /* const provider = await this.providerRepository.findByTerm(dto.name)
        if (provider) throw CustomError.badRequest("Proveedor ya existe"); */
        const providerCreate = this.providerRepository.create(dto);
        return providerCreate;
    }
}