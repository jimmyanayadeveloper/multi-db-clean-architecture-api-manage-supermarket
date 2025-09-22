import { PaginatedResponse, Pagination } from "../../../../common/pagination";

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

export interface BillsSummary {
    totalAmount: number;
    countBills: number;
}

export interface BillResponseWithSummaryPaginated extends PaginatedResponse<BillResponse, BillsSummary> { }

export interface BillsSummariesByPaidStatus {
    paid: BillsSummary;
    unpaid: BillsSummary;
    all: BillsSummary
}