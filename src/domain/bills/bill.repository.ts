import { Bill } from "./bill.entity";

export interface BillRepository {
    addAllBill(bill: Bill): Bill;
    delete(numberBill: string): boolean;
    findByNumber(numberBill: string): Bill | null;
    getAllBill(): Bill[];
    update(numberBill: string, update: Partial<Bill>): Bill | null;
}