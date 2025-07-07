import { Provider } from "./provider.entity";

export interface ProviderRepository {
    createProvider(provider: Provider): Provider;
    delete(term: string): boolean
    findByTerm(term: string): Provider | null;
    getAllProvider(): Provider[];
    update(term: string, update: Partial<Provider>): Provider | null;
}
