import { Provider } from "../../domain/providers/provider.entity";
import { ProviderRepository } from "../../domain/providers/provider.repository";

export const fakeProviders: Provider[] = [
    {
        name: "Proveedor Alfa",
        nit: "900123456-1",
        salemen: "Carlos Ruiz",
        creditBalance: 50000,
        withholdingsTaxes: true,
        saleWithCredit: true
    },
    {
        name: "Distribuidora Beta",
        nit: "800987654-3",
        salemen: "Lucía Gómez",
        creditBalance: 120000,
        withholdingsTaxes: false,
        saleWithCredit: true
    },
    {
        name: "Suministros Gamma",
        nit: "901112233-9",
        salemen: "Juan Pérez",
        creditBalance: 35000,
        withholdingsTaxes: true,
        saleWithCredit: false
    },
    {
        name: "Servicios Delta",
        nit: "900998877-4",
        salemen: "Mariana Torres",
        creditBalance: 0,
        withholdingsTaxes: false,
        saleWithCredit: false
    },
    {
        name: "Comercial Epsilon",
        nit: "890123789-2",
        salemen: "Andrés Herrera",
        creditBalance: 89000,
        withholdingsTaxes: true,
        saleWithCredit: true
    },
    {
        name: "Proveedor Zeta",
        nit: "901554433-6",
        salemen: "Paola Jiménez",
        creditBalance: 14500,
        withholdingsTaxes: false,
        saleWithCredit: true
    },
    {
        name: "Importaciones Eta",
        nit: "800345678-1",
        salemen: "Felipe Rojas",
        creditBalance: 65000,
        withholdingsTaxes: true,
        saleWithCredit: true
    },
    {
        name: "Tecnología Theta",
        nit: "901667788-5",
        salemen: "Laura Ramírez",
        creditBalance: 27500,
        withholdingsTaxes: true,
        saleWithCredit: false
    },
    {
        name: "Papelería Iota",
        nit: "830001122-0",
        salemen: "Oscar López",
        creditBalance: 105000,
        withholdingsTaxes: false,
        saleWithCredit: true
    },
    {
        name: "Transportes Kappa",
        nit: "900777888-2",
        salemen: "Verónica Díaz",
        creditBalance: 34000,
        withholdingsTaxes: true,
        saleWithCredit: true
    }
];


export class InMemoriaProviderRepository implements ProviderRepository {
    createProvider(provider: Provider): Provider {
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
}