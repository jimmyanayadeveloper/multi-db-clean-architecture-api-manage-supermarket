import { DeepPartial } from "typeorm";
import { ProviderEntity } from "../../../domain/providers";
import { ProviderDts } from "../../datasources/postgreSQL/entities/provider.entities";

export class ProviderMapper {
    static toEntity(provider: ProviderDts): ProviderEntity {
        return ProviderEntity.create({
            id: provider.id,
            name: provider.name,
            nit: provider.nit,
            salesman: provider.salesman,
            creditBalance: provider.creditBalance,
            withHoldingsTaxes: provider.withHoldingsTaxes,
            creditDays: provider.creditDays,
            status: provider.isActive,
        }
        );
    }

    static toEntities(providers: ProviderDts[]): ProviderEntity[] {
        return providers.map(this.toEntity);
    }

    static toDts(provider: ProviderEntity): DeepPartial<ProviderDts> {
        return {
            name: provider.name,
            nit: provider.nit,
            salesman: provider.salesman,
            creditBalance: provider.creditBalance,
            withHoldingsTaxes: provider.withHoldingsTaxes,
            creditDays: provider.creditDays,
            isActive: provider.status
        }
    }
}