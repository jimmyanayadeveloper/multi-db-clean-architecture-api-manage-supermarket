
import { RegisterProviderDto } from "../../../application/providers/dto/create-provider-dto";
import { ProviderEntity } from "../entities/provider.entity";

export interface CreateProviderUseCase {
    execute(dto: RegisterProviderDto): Promise<ProviderEntity>
}