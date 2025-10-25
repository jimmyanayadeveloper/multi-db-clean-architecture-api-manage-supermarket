import { ProviderEntity } from "../entities/provider.entity";

export interface ProviderDatasource {
    create(createProvider: Partial<ProviderEntity>): Promise<ProviderEntity>;
    edit(updateProvider: Partial<ProviderEntity>): Promise<ProviderEntity>;
    findById(id: string): Promise<ProviderEntity | null>;
    findByName(name: string): Promise<ProviderEntity | null>;
    findByNit(id: string): Promise<ProviderEntity | null>;
    findByTerm(term: string): Promise<ProviderEntity[]>;
    inactivate(id: string): Promise<boolean>;
    showAll(): Promise<ProviderEntity[]>;
}