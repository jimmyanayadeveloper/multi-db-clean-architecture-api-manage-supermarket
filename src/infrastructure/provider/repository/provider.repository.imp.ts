import { ProviderDatasource, ProviderEntity, ProviderRepository } from "../../../domain/providers";

export class ProviderRepositoryImpl implements ProviderRepository {
    constructor(private readonly datasource: ProviderDatasource) { }

    create(provider: ProviderEntity): Promise<ProviderEntity> {
        return this.datasource.create(provider)
    }
    edit(update: ProviderEntity): Promise<ProviderEntity> {
        return this.datasource.edit(update);
    }
    findById(id: string): Promise<ProviderEntity | null> {
        return this.datasource.findById(id)
    }
    findByName(name: string): Promise<ProviderEntity | null> {
        return this.datasource.findByName(name);
    }
    findByNit(term: string): Promise<ProviderEntity | null> {
        return this.datasource.findByNit(term);
    }
    findByTerm(term: string): Promise<ProviderEntity[]> {
        return this.datasource.findByTerm(term);
    }
    inactivate(id: string): Promise<boolean> {
        return this.datasource.inactivate(id);
    }
    showAll(): Promise<ProviderEntity[]> {
        return this.datasource.showAll()
    }
}
