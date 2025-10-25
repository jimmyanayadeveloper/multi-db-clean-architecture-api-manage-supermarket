import { ProviderEntity } from "../entities/provider.entity";

export interface FindProviderByNameUseCase {
    execute(name: string): Promise<ProviderEntity>
}