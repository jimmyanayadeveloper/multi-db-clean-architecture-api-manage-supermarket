import { BillEntity } from "../entities/bill.entity";

export interface BillDatasource {
    register(dataBill: BillEntity): Promise<BillEntity>;
    edit(id: string, updateBill: Partial<BillEntity>): Promise<BillEntity | null>;
    findById(id: string): Promise<BillEntity[] | null>;
    findByNumberBill(numberBill: string): Promise<BillEntity[]>;
    findByProvider(idProvider: string): Promise<BillEntity[]>;
    findByNumberBillAndProvider(numberBill: string, providerId: string): Promise<BillEntity | null>
    payBill(numberBill: string, providerId: string, paidDate?: Date): Promise<BillEntity | null>;
    showAllBillByStatus(status: boolean): Promise<BillEntity[]>;
    showAll(): Promise<BillEntity[]>
}