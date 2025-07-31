import { CreateProviderDto } from "../dto/create-provider-dto";
import { ProviderEntity } from "../entities/provider.entity";

export interface CreateProviderUseCase {
    execute(dto: CreateProviderDto): Promise<ProviderEntity>
}