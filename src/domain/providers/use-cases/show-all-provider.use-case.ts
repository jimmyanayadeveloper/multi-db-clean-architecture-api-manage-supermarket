import { Pagination } from "../../common/pagination";
import { ProviderEntity } from "../entities/provider.entity";

export interface ShowAllProviderUseCase {
    execute(pagination: Pagination): Promise<[ProviderEntity[], number]>
}