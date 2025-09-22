import { ProviderEntity } from "../../domain/providers";
import { ProviderDts } from "../datasources/postgreSQL/entities/provider.entities";

export class ProviderMapper {
    static toEntity(provider: ProviderDts): ProviderEntity {
        return new ProviderEntity(
            provider.id,
            provider.name,
            provider.nit,
            provider.salesman,
            provider.creditBalance,
            provider.withHoldingsTaxes,
            provider.creditDays,
            provider.isActive,
        );
    }

    static toEntities(providers: ProviderDts[]): ProviderEntity[] {
        return providers.map(this.toEntity);
    }

}