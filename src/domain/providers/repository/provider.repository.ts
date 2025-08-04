import { CreateProviderDto } from "../dto/create-provider-dto";
import { UpdateProviderDto } from "../dto/update-provider-dto";
import { ProviderEntity } from "../entities/provider.entity";


export interface ProviderRepository {
    create(provider: CreateProviderDto): Promise<ProviderEntity>;
    edit(term: string, update: UpdateProviderDto): Promise<ProviderEntity | null>;
    findById(term: string): Promise<ProviderEntity | null>;
    findByNit(term: string): Promise<ProviderEntity | null>;
    findByTerm(term: string): Promise<ProviderEntity[]>
    inactivate(id: string): Promise<boolean>;
    showAll(): Promise<ProviderEntity[]>;
}
