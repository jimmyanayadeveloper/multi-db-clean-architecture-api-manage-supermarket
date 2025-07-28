import { ProviderPartial } from "../interfaces/provider-partial.interface";

export class CreateProviderDto {

    public name: string;
    public nit: string;
    public salemen: string;
    public creditBalance: number;
    public withholdingsTaxes: boolean;
    public saleWithCredit: boolean;

    constructor({
        name,
        nit,
        salemen,
        creditBalance = 0,
        withholdingsTaxes = false,
        saleWithCredit = false,
    }: ProviderPartial) {
        this.name = name;
        this.nit = nit;
        this.salemen = salemen;
        this.creditBalance = creditBalance;
        this.withholdingsTaxes = withholdingsTaxes;
        this.saleWithCredit = saleWithCredit;
    }

    static create(object: Partial<ProviderPartial>): [string?, CreateProviderDto?] {
        const { name, nit, salemen } = object;

        if (!name) return ['Missing name'];
        if (!nit) return ['Missing nit'];
        if (!salemen) return ['Missing salemen'];

        const creditBalance = Number(object.creditBalance ?? 0);
        const withholdingsTaxes = Boolean(object.withholdingsTaxes ?? false);
        const saleWithCredit = Boolean(object.saleWithCredit ?? false);

        const provider = new CreateProviderDto({
            name, nit, salemen, creditBalance, withholdingsTaxes, saleWithCredit
        })

        return [undefined, provider]
    }
}