import { ProviderEntity } from "../entities/provider.entity";

export interface FindByTermUseCase {
    execute(term: string): Promise<ProviderEntity[]>
}