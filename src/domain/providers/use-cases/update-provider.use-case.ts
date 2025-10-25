import { UpdateProviderDto } from "../../../application/providers/dto/update-provider-dto";
import { ProviderEntity } from "../entities/provider.entity";

export interface UpdateProviderUseCase {
    execute(id: string, dto: UpdateProviderDto): Promise<ProviderEntity | null>
}