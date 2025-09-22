
export interface UpdateBillData {
    provider?: { id?: string, name?: string },
    numberBill?: string,
    amountBill?: number,
    dateIn?: Date,
    payDate?: Date
}