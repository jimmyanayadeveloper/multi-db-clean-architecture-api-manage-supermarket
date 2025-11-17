export interface BillsSummary {
    totalAmount: number;
    countBills: number;
}

export interface BillsSummariesByPaidStatus {
    paid: BillsSummary;
    unpaid: BillsSummary;
    all: BillsSummary
}

export interface BillMinResponse {
    providerName: string,
    numberBill: string,
    amount: number
}

