export class ProviderEntity {
    constructor(
        public name: string,
        public nit: string,
        public salemen: string,
        public creditBalance: number,
        public withholdingsTaxes: boolean,
        public saleWithCredit: boolean
    ) { }
}
