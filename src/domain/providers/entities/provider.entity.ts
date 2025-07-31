export class ProviderEntity {
    constructor(
        public name: string,
        public nit: string,
        public salesman: string,
        public creditBalance: number,
        public withHoldingsTaxes: boolean,
        public saleWithCredit: boolean
    ) { }
}
