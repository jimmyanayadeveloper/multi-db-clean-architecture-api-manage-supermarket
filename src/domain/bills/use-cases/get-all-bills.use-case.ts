import { Pagination } from "../../common/pagination";
import { BillEntity } from "../entities/bill.entity";

export interface GetAllBillsUseCase {
    execute(pagination: Pagination): Promise<[BillEntity[], number]>
} 