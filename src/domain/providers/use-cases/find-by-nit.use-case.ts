import { ProviderEntity } from "../entities/provider.entity";

export interface FindProviderByNitUseCase {
    execute(nit: string): Promise<ProviderEntity>
}