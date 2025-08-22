
import { BillEntity } from "../entities/bill.entity";

export interface BillRepository {
    register(newBill: BillEntity): Promise<BillEntity>;
    edit(id: string, changes: Partial<BillEntity>): Promise<BillEntity | null>;
    findByNumber(numberBill: string): Promise<BillEntity[] | null>;
    findByNumberBillAndProvider(numberBill: string, providerId: string): Promise<BillEntity | null>
    findByProvider(nameProvider: string): Promise<BillEntity[]>
    showAllBill(): Promise<BillEntity[]>;
    showAllBillByStatus(status: boolean): Promise<BillEntity[]>;
    payBill(numberBill: string, providerId: string, paidDate?: Date): Promise<BillEntity | null>
}