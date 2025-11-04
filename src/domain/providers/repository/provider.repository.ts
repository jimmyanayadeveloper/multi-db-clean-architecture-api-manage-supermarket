import { Pagination } from "../../common/pagination";
import { ProviderEntity } from "../entities/provider.entity";

export interface ProviderRepository {
    create(provider: ProviderEntity): Promise<ProviderEntity>;
    edit(update: ProviderEntity): Promise<ProviderEntity>;
    findById(term: string): Promise<ProviderEntity | null>;
    findByName(term: string): Promise<ProviderEntity | null>;
    findByNit(term: string): Promise<ProviderEntity | null>;
    findByTerm(term: string): Promise<ProviderEntity[]>
    inactivate(id: string): Promise<boolean>;
    showAll(pagination: Pagination): Promise<[ProviderEntity[], number]>;
}
