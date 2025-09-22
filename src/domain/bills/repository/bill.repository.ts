import { Pagination } from "../../common/pagination";
import { BillEntity } from "../entities/bill.entity";
import { UpdateBillData } from "../interfaces/dto/request/update.dto";
import { BillResponseWithSummaryPaginated, BillsSummariesByPaidStatus } from "../interfaces/dto/response/response.dto";

export interface BillRepository {
    edit(id: string, changes: UpdateBillData): Promise<BillEntity | null>;
    findByNumber(numberBill: string): Promise<BillEntity[] | null>;
    findByNumberBillAndProvider(numberBill: string, providerId: string): Promise<BillEntity | null>
    findByProvider(nameProvider: string): Promise<BillEntity[]>
    getSummaryBillsSlipByPaidStatus(providerId?: string): Promise<BillsSummariesByPaidStatus>;
    payBill(idBill: string, paidDate?: Date): Promise<BillEntity | null>
    register(newBill: BillEntity): Promise<BillEntity | null>;
    showAllBill(pagination: Pagination): Promise<[BillEntity[], number]>;
    showAllBillByStatus(status: boolean): Promise<BillEntity[]>;
    showStandarInfoBillsDashboard(pagination?: Pagination): Promise<BillResponseWithSummaryPaginated>;
}