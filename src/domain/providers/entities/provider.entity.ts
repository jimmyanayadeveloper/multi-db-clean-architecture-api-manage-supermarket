import { ProviderValidators } from "../validators/provider.validators"

export class ProviderEntity {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly nit: string,
        public readonly salesman: string,
        public readonly creditBalance: number,
        public readonly withHoldingsTaxes: boolean,
        public readonly creditDays: number,
        public readonly status: boolean
    ) { }

    static create(props: {
        id?: string,
        name: string,
        nit: string,
        salesman: string,
        creditBalance: number,
        withHoldingsTaxes: boolean,
        creditDays: number,
        status: boolean
    }): ProviderEntity {

        ProviderValidators.ValidateName(props.name);
        ProviderValidators.ValidateNit(props.nit);
        ProviderValidators.ValidateCreditBalance(props.creditBalance, props.creditDays);

        return new ProviderEntity(
            props.id ?? '',
            props.name,
            props.nit,
            props.salesman,
            props.creditBalance,
            props.withHoldingsTaxes,
            props.creditDays,
            props.status
        )
    }

    static update(actual: ProviderEntity, changes: Partial<ProviderEntity>): ProviderEntity {
        const updated = { ...actual, ...changes }
        return ProviderEntity.create({
            id: actual.id,
            name: updated.name,
            nit: updated.nit,
            salesman: updated.salesman,
            creditBalance: updated.creditBalance,
            creditDays: updated.creditDays,
            withHoldingsTaxes: updated.withHoldingsTaxes,
            status: updated.status
        })
    }
}
