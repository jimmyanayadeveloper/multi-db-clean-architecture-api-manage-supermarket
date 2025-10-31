import { ProviderMin } from "../../../providers/interfaces/provider-summaries";

export interface RegisterBillRequest {
    provider: ProviderMin
    numberBill: string;
    amountBill: number;
    dateIn: Date;
    payDate: Date;
    isPaid: boolean;
    creditDays: number
}