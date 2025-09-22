import { Pagination } from "../../common/pagination";
import { BillEntity } from "../entities/bill.entity";
import { BillsSummariesByPaidStatus } from "../interfaces/dto/response/response.dto";

export interface BillDatasource {
    register(dataBill: BillEntity): Promise<BillEntity | null>;
    edit(id: string, updateBill: Partial<BillEntity>): Promise<BillEntity | null>;
    findById(id: string): Promise<BillEntity[] | null>;
    findByNumberBill(numberBill: string): Promise<BillEntity[]>;
    findByProvider(idProvider: string): Promise<BillEntity[]>;
    findByNumberBillAndProvider(numberBill: string, providerId: string): Promise<BillEntity | null>
    getSummarySlipByPaidStatus(providerId?: string): Promise<BillsSummariesByPaidStatus>;
    payBill(idBill: string, paidDate?: Date): Promise<BillEntity | null>;
    showAllBillByStatus(status: boolean): Promise<BillEntity[]>;
    showAll(pagination: Pagination): Promise<[BillEntity[], number]>
}