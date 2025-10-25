import { Pagination } from "../../common/pagination";
import { BillEntity } from "../entities/bill.entity";
import { BillsSummariesByPaidStatus } from "../interface/bill-summaries";

export interface BillDatasource {
    edit(updateBill: Partial<BillEntity>): Promise<BillEntity | null>;
    findById(id: string): Promise<BillEntity | null>;
    findByNumberBill(numberBill: string): Promise<BillEntity[]>;
    findByNumberBillAndProvider(numberBill: string, providerId: string): Promise<BillEntity | null>
    findByProvider(idProvider: string): Promise<BillEntity[]>;
    getSummarySlipByPaidStatus(providerId?: string): Promise<BillsSummariesByPaidStatus>;
    payBill(idBill: string, paidDate?: Date): Promise<BillEntity | null>;
    register(dataBill: BillEntity): Promise<BillEntity | null>;
    showAll(pagination: Pagination): Promise<[BillEntity[], number]>
    showAllBillByStatus(status: boolean): Promise<BillEntity[]>;
}