export interface BillsSummary {
    totalAmount: number;
    countBills: number;
}

export interface BillsSummariesByPaidStatus {
    paid: BillsSummary;
    unpaid: BillsSummary;
    all: BillsSummary
}

