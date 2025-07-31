export interface ProviderPartial {
    name: string;
    nit: string;
    salesman: string;
    creditBalance?: number;
    withHoldingsTaxes?: boolean;
    saleWithCredit?: boolean;
}