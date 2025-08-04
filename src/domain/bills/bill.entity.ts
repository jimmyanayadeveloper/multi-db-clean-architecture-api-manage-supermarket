
export interface BillEntity {
    id: string;
    provider: string;
    numberBill: string;
    amountBill: number;
    creditDays: number;
    dateIn: string;
    datePaid: string;
    isPaid: string;
}