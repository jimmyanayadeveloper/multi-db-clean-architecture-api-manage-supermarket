import { ProviderEntity } from "../../domain/providers";
import { Provider } from "../database/postgreSQL/entities/provider.entities";

export class ProviderMapper {
    static toEntity(provider: Provider): ProviderEntity {
        return new ProviderEntity(
            provider.name,
            provider.nit,
            provider.salesman,
            provider.creditBalance,
            provider.withHoldingsTaxes,
            provider.saleWithCredit
        );
    }

    static toEntities(providers: Provider[]): ProviderEntity[] {
        return providers.map(this.toEntity);
    }
}