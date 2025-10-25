import { ProviderEntity, RegisterProviderDto } from "../../../domain/providers";

export class ProviderAssembler {
    static fromDtoToEntity(dto: RegisterProviderDto, id: string = ''): ProviderEntity {
        return ProviderEntity.create({
            id,
            name: dto.name,
            nit: dto.nit,
            salesman: dto.salesman,
            creditBalance: dto.creditBalance,
            withHoldingsTaxes: dto.withHoldingsTaxes,
            creditDays: dto.creditDays,
            status: true
        }
        )
    }
}