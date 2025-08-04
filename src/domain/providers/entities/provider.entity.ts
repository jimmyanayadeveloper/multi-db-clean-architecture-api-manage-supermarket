export class ProviderEntity {
    constructor(
        public id: string,
        public name: string,
        public nit: string,
        public salesman: string,
        public creditBalance: number,
        public withHoldingsTaxes: boolean,
        public creditDays: number,
        public status: boolean
    ) { }
}
