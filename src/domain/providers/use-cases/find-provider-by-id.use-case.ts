import { ProviderEntity } from "../entities/provider.entity";

export interface FindProviderById {
    execute(id: string): Promise<ProviderEntity> | null
}