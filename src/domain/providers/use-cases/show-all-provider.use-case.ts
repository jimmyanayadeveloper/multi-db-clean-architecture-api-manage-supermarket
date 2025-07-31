import { ProviderEntity } from "../entities/provider.entity";

export interface ShowAllProviderUseCase {
    execute(): Promise<ProviderEntity[]>
}