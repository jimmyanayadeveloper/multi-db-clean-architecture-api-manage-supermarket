import { ProviderPartial } from "../interfaces/provider-partial.interface";

export class CreateProviderDto {

    public name: string;
    public nit: string;
    public salesman: string;
    public creditBalance: number;
    public withHoldingsTaxes: boolean;
    public saleWithCredit: boolean;

    constructor({
        name,
        nit,
        salesman,
        creditBalance = 0,
        withHoldingsTaxes = false,
        saleWithCredit = false,
    }: ProviderPartial) {
        this.name = name;
        this.nit = nit;
        this.salesman = salesman;
        this.creditBalance = creditBalance;
        this.withHoldingsTaxes = withHoldingsTaxes;
        this.saleWithCredit = saleWithCredit;
    }

    static create(object: Partial<ProviderPartial>): [string?, CreateProviderDto?] {
        if (!object) return ["Missing object"];

        const { name, nit, salesman } = object;


        if (!name) return ['Missing name'];
        if (!nit) return ['Missing nit'];
        if (!salesman) return ['Missing salesman'];

        const creditBalance = Number(object.creditBalance ?? 0);
        const withHoldingsTaxes = Boolean(object.withHoldingsTaxes ?? false);
        const saleWithCredit = Boolean(object.saleWithCredit ?? false);

        const provider = new CreateProviderDto({
            name, nit, salesman, creditBalance, withHoldingsTaxes, saleWithCredit
        })

        return [undefined, provider]
    }
}