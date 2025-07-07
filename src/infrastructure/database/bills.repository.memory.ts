import { Bill } from "../../domain/bills/bill.entity";
import { BillRepository } from "../../domain/bills/bill.repository";

const bills: Bill[] = [
    {
        provider: "Proveedor A",
        value: 1500.75,
        dateIn: "2025-06-01T00:00:00.000Z",
        numberBill: "A-1001",
        creditDays: 30
    },
    {
        provider: "Proveedor B",
        value: 2340.00,
        dateIn: "2025-06-05T00:00:00.000Z",
        numberBill: "B-2034",
        creditDays: 15
    },
    {
        provider: "Proveedor C",
        value: 875.50,
        dateIn: "2025-06-10T00:00:00.000Z",
        numberBill: "C-5432",
        creditDays: 45
    },
    {
        provider: "Proveedor D",
        value: 3210.99,
        dateIn: "2025-06-15T00:00:00.000Z",
        numberBill: "D-8765",
        creditDays: 60
    },
    {
        provider: "Proveedor E",
        value: 1299.99,
        dateIn: "2025-06-20T00:00:00.000Z",
        numberBill: "E-1122",
        creditDays: 10
    }
];

export class InMemoriaBillRepository implements BillRepository {
    getAllBill(): Bill[] {
        return bills;
    }
    addAllBill(bill: Bill): Bill {
        bills.push(bill);
        return bill;
    }
    findByNumber(numberBill: string): Bill | null {
        return bills.find(bill => bill.numberBill === numberBill) || null;
    }
    update(numberBill: string, update: Partial<Bill>): Bill | null {
        const bill = this.findByNumber(numberBill);
        if (!bill) return null;
        Object.assign(bill, update);
        return bill;
    }
    delete(numberBill: string): boolean {
        const index = bills.findIndex(bill => bill.numberBill === numberBill);
        if (index === -1) return false;
        bills.splice(index, 1);
        return true;
    }

}