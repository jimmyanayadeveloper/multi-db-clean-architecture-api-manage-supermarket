
export interface BillPartial {
    providerId: string;
    numberBill: string;
    amountBill: number;
    dateIn: Date | string;
    isPaid: boolean;
    creditDays: number
    datePaid: Date | string;
}