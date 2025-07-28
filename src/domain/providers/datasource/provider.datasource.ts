import { CreateProviderDto } from "../dto/create-provider-dto";
import { UpdateProviderDto } from "../dto/update-provider-dto";
import { ProviderEntity } from "../entities/provider.entity";


export interface ProviderDatasource {
    create(createProvider: CreateProviderDto): Promise<ProviderEntity>;
    edit(updateProvider: UpdateProviderDto): Promise<ProviderEntity>;
    showAll(): Promise<ProviderEntity[]>
}