import { BillEntity } from "./bill.entity";

export interface BillRepository {
    addAllBill(bill: Partial<BillEntity>): Promise<BillEntity>;
    delete(numberBill: string): boolean;
    findByNumber(numberBill: string): Promise<BillEntity> | null;
    getAllBill(): Promise<BillEntity>;
    update(numberBill: string, update: Partial<BillEntity>): Promise<BillEntity> | null;
}