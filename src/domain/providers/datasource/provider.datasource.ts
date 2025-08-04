import { CreateProviderDto } from "../dto/create-provider-dto";
import { UpdateProviderDto } from "../dto/update-provider-dto";
import { ProviderEntity } from "../entities/provider.entity";


export interface ProviderDatasource {
    create(createProvider: CreateProviderDto): Promise<ProviderEntity>;
    edit(id: string, updateProvider: UpdateProviderDto): Promise<ProviderEntity | null>;
    findById(id: string): Promise<ProviderEntity | null>;
    findByNit(id: string): Promise<ProviderEntity | null>;
    findByTerm(term: string): Promise<ProviderEntity[]>;
    inactivate(id: string): Promise<boolean>;
    showAll(): Promise<ProviderEntity[]>;
}