import { BillDatasource } from "../../../domain/bills/datasource/bill.datasource";
import { BillEntity } from "../../../domain/bills/entities/bill.entity";
import { BillsSummariesByPaidStatus, BillResponseWithSummaryPaginated } from "../../../domain/bills/interfaces/dto/response/response.dto";
import { BillRepository } from "../../../domain/bills/repository/bill.repository";
import { Pagination } from "../../../domain/common/pagination";


export class BillsRepositoryImpl implements BillRepository {
    constructor(private readonly datasource: BillDatasource) { }
    getSummaryBillsSlipByPaidStatus(providerId?: string): Promise<BillsSummariesByPaidStatus> {
        return this.datasource.getSummarySlipByPaidStatus(providerId);
    }

    showStandarInfoBillsDashboard(pagination?: Pagination): Promise<BillResponseWithSummaryPaginated> {
        throw new Error("Method not implemented.");
    }

    edit(id: string, changes: Partial<BillEntity>): Promise<BillEntity | null> {
        return this.datasource.edit(id, changes)
    }

    findByNumber(numberBill: string): Promise<BillEntity[]> {
        return this.datasource.findByNumberBill(numberBill);
    }

    findByNumberBillAndProvider(numberBill: string, providerId: string): Promise<BillEntity | null> {
        return this.datasource.findByNumberBillAndProvider(numberBill, providerId)
    }

    findByProvider(idProvider: string): Promise<BillEntity[]> {
        return this.datasource.findByProvider(idProvider);
    }

    payBill(idBill: string, paidDate?: Date): Promise<BillEntity | null> {
        return this.datasource.payBill(idBill, paidDate)
    }

    register(newBill: BillEntity): Promise<BillEntity | null> {
        return this.datasource.register(newBill);
    }

    showAllBill(pagination: Pagination): Promise<[BillEntity[], number]> {
        return this.datasource.showAll(pagination);
    }

    showAllBillByStatus(status: boolean): Promise<BillEntity[]> {
        return this.datasource.showAllBillByStatus(status);
    }
}