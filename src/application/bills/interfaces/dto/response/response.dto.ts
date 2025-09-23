export interface BillResponse {
    id: string;
    provider: { id: string; name: string };
    numberBill: string;
    amountBill: number;
    dateIn: Date;
    datePaid: Date;
    isPaid: boolean;
}

export interface BillMinResponse {
    providerName: string,
    numberBill: string,
    amount: number,
}



