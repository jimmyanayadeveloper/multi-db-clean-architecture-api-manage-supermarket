import { BillDatasource } from "../../../domain/bills/datasource/bill.datasource";
import { BillEntity } from "../../../domain/bills/entities/bill.entity";
import { BillRepository } from "../../../domain/bills/repository/bill.repository";


export class BillsRepositoryImpl implements BillRepository {
    constructor(private readonly datasource: BillDatasource) { }

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

    payBill(numberBill: string, providerId: string, paidDate?: Date): Promise<BillEntity | null> {
        return this.datasource.payBill(numberBill, providerId, paidDate)
    }

    register(newBill: BillEntity): Promise<BillEntity> {
        return this.datasource.register(newBill);
    }

    showAllBill(): Promise<BillEntity[]> {
        return this.datasource.showAll();
    }

    showAllBillByStatus(status: boolean): Promise<BillEntity[]> {
        return this.datasource.showAllBillByStatus(status);
    }
}