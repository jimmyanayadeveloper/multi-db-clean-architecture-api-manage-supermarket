import { CreateProviderDto, ProviderDatasource, ProviderEntity, ProviderRepository, UpdateProviderDto } from "../../../domain/providers";


export class ProviderRepositoryImpl implements ProviderRepository {
    constructor(private readonly datasource: ProviderDatasource) { }
    create(provider: CreateProviderDto): Promise<ProviderEntity> {
        return this.datasource.create(provider)
    }
    edit(id: string, update: UpdateProviderDto): Promise<ProviderEntity | null> {
        return this.datasource.edit(id, update);
    }
    findById(id: string): Promise<ProviderEntity | null> {
        return this.datasource.findById(id)
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
