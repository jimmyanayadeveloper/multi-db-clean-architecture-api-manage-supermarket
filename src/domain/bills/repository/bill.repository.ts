import { Pagination } from "../../common/pagination";
import { BillEntity } from "../entities/bill.entity";
import { UpdateBillData } from "../../../application/bills/interfaces/dto/request/update.dto";
import { BillsSummariesByPaidStatus } from "../interface/bill-summaries";

export interface BillRepository {
    edit(changes: UpdateBillData): Promise<BillEntity | null>;
    findById(uuid: string): Promise<BillEntity | null>;
    findByNumber(numberBill: string): Promise<BillEntity[] | null>;
    findByNumberBillAndProvider(numberBill: string, providerId: string): Promise<BillEntity | null>
    findByProvider(nameProvider: string): Promise<BillEntity[]>
    getSummaryBillsSlipByPaidStatus(providerId?: string): Promise<BillsSummariesByPaidStatus>;
    payBill(idBill: string, paidDate?: Date): Promise<BillEntity | null>
    register(newBill: BillEntity): Promise<BillEntity | null>;
    showAllBill(pagination: Pagination): Promise<[BillEntity[], number]>;
    showAllBillByStatus(status: boolean): Promise<BillEntity[]>;
}