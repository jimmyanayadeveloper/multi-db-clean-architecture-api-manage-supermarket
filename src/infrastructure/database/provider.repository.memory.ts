/* 
import { ProviderEntity } from "../../domain/providers";
import { ProviderRepository } from "../../domain/providers/repository/provider.repository";

export const fakeProviders: ProviderEntity[] = [
    {
        name: "Proveedor Alfa",
        nit: "900123456-1",
        salesman: "Carlos Ruiz",
        creditBalance: 50000,
        withHoldingsTaxes: true,
        saleWithCredit: true
    },
    {
        name: "Distribuidora Beta",
        nit: "800987654-3",
        salesman: "Lucía Gómez",
        creditBalance: 120000,
        withHoldingsTaxes: false,
        saleWithCredit: true
    },
    {
        name: "Suministros Gamma",
        nit: "901112233-9",
        salesman: "Juan Pérez",
        creditBalance: 35000,
        withHoldingsTaxes: true,
        saleWithCredit: false
    },
    {
        name: "Servicios Delta",
        nit: "900998877-4",
        salesman: "Mariana Torres",
        creditBalance: 0,
        withHoldingsTaxes: false,
        saleWithCredit: false
    },
    {
        name: "Comercial Epsilon",
        nit: "890123789-2",
        salesman: "Andrés Herrera",
        creditBalance: 89000,
        withHoldingsTaxes: true,
        saleWithCredit: true
    },
    {
        name: "Proveedor Zeta",
        nit: "901554433-6",
        salesman: "Paola Jiménez",
        creditBalance: 14500,
        withHoldingsTaxes: false,
        saleWithCredit: true
    },
    {
        name: "Importaciones Eta",
        nit: "800345678-1",
        salesman: "Felipe Rojas",
        creditBalance: 65000,
        withHoldingsTaxes: true,
        saleWithCredit: true
    },
    {
        name: "Tecnología Theta",
        nit: "901667788-5",
        salesman: "Laura Ramírez",
        creditBalance: 27500,
        withHoldingsTaxes: true,
        saleWithCredit: false
    },
    {
        name: "Papelería Iota",
        nit: "830001122-0",
        salesman: "Oscar López",
        creditBalance: 105000,
        withHoldingsTaxes: false,
        saleWithCredit: true
    },
    {
        name: "Transportes Kappa",
        nit: "900777888-2",
        salesman: "Verónica Díaz",
        creditBalance: 34000,
        withHoldingsTaxes: true,
        saleWithCredit: true
    }
];


/* export class InMemoriaProviderRepository implements ProviderRepository {
    createProvider(provider: ProviderEntity): ProviderEntity {
        fakeProviders.push(provider);
        return provider;
    }
    delete(term: string): boolean {
        const index = fakeProviders.findIndex(provider =>
            provider.nit === term || provider.name === term
        )
        if (index === -1) return false;
        fakeProviders.splice(index, 1);
        return true;
    }
    findByTerm(term: string): Provider | null {
        return fakeProviders.find(provider =>
            provider.nit === term || provider.name === term
        ) || null
    }
    getAllProvider(): Provider[] {
        return fakeProviders;
    }
    update(term: string, update: Partial<Provider>): Provider | null {
        const provider = this.findByTerm(term);
        if (!provider) return null;
        Object.assign(provider, update);
        return provider;
    }
} */ 