export interface ProviderPartial {
    name: string;
    nit: string;
    salemen: string;
    creditBalance?: number;
    withholdingsTaxes?: boolean;
    saleWithCredit?: boolean;
}