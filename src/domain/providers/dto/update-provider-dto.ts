import { ProviderPartial } from "../interfaces/provider-partial.interface";
import { ProviderEntity } from '../entities/provider.entity';
import { Validators } from "../../../config";

type UpdateProviderResponse = [string?, UpdateProviderDto?, Record<string, { old: any; new: any }>?]

export class UpdateProviderDto {

    public name?: string;
    public nit?: string;
    public salesman?: string;
    public creditBalance?: number;
    public withHoldingsTaxes?: boolean;
    public saleWithCredit?: boolean;

    constructor({
        name,
        nit,
        salesman,
        creditBalance,
        withHoldingsTaxes,
        saleWithCredit,
    }: Partial<ProviderPartial>) {
        this.name = name;
        this.nit = nit;
        this.salesman = salesman;
        this.creditBalance = creditBalance;
        this.withHoldingsTaxes = withHoldingsTaxes;
        this.saleWithCredit = saleWithCredit;
    }

    static update(object: Partial<ProviderPartial>, providerChange: ProviderEntity): UpdateProviderResponse {

        const { hasChanges, diff } = Validators.hasChanges(object, providerChange);

        if (!hasChanges) return ["No changes provided"]

        const updatedProvider: ProviderPartial = {
            name: object.name ?? providerChange.name,
            nit: object.nit ?? providerChange.nit,
            salesman: object.salesman ?? providerChange.salesman,
            creditBalance: object.creditBalance ?? providerChange.creditBalance,
            withHoldingsTaxes: object.withHoldingsTaxes ?? providerChange.withHoldingsTaxes ?? false,
            saleWithCredit: object.saleWithCredit ?? providerChange.saleWithCredit ?? false
        }

        const provider = new UpdateProviderDto(updatedProvider)

        return [undefined, provider, diff];
    }
}