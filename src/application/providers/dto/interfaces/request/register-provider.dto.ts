

export interface RegisterProviderRequest {
    name: string;
    nit: string,
    salesman: string,
    creditBalance?: number,
    withholdingsTaxes?: boolean,
    saleWithCredit?: boolean,
    creditDays?: number,
}
