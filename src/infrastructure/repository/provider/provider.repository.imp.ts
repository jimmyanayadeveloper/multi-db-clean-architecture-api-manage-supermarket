import { CreateProviderDto, ProviderDatasource, ProviderEntity, ProviderRepository, UpdateProviderDto } from "../../../domain/providers";


export class ProviderRepositoryImpl implements ProviderRepository {
    constructor(private readonly datasource: ProviderDatasource) { }
    create(provider: CreateProviderDto): Promise<ProviderEntity> {
        return this.datasource.create(provider)
    }
    edit(term: string, update: UpdateProviderDto): ProviderEntity | null {
        throw new Error("Method not implemented.");
    }
    delete(term: string): boolean {
        throw new Error("Method not implemented.");
    }
    findByTerm(term: string): Promise<ProviderEntity[]> {
        return this.datasource.findByTerm(term);
    }
    showAll(): Promise<ProviderEntity[]> {
        return this.datasource.showAll()
    }
}
