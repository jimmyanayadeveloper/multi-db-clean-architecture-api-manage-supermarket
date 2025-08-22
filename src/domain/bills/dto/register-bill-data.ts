export interface RegisterBillData {
    providerId: string;
    numberBill: string;
    amountBill: number;
    dateIn: Date;
    payDate: Date;
    isPaid: boolean;
}
