import { CreateProviderDto } from "../dto/create-provider-dto";
import { UpdateProviderDto } from "../dto/update-provider-dto";
import { ProviderEntity } from "../entities/provider.entity";


export interface ProviderRepository {
    create(provider: CreateProviderDto): Promise<ProviderEntity>;
    edit(term: string, update: UpdateProviderDto): ProviderEntity | null;
    delete(term: string): boolean
    findByTerm(term: string): Promise<ProviderEntity[]>;
    showAll(): Promise<ProviderEntity[]>;
}
