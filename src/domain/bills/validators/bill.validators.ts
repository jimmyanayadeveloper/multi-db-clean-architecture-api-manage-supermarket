
import { CustomError } from "../../errors/custom.error";
import { ProviderMin } from "../../providers/interfaces/provider-summaries";

export class BillValidators {
    static validateProvider(provider: ProviderMin) {
        if (!provider || !provider.id.trim()) throw CustomError.badRequest("Provider is required");
    }
    static validateNumberBill(numberBill: string) {
        if (!numberBill || numberBill.trim().length === 0) throw CustomError.badRequest("Bill number is required");
    }
    static validateAmount(amount: number) {
        if (amount == null || isNaN(amount)) throw CustomError.badRequest("Amount bill must be a valid number");
        if (amount < 0) throw CustomError.badRequest("Amount can't less to 0");
    }
    static validateDates(dateIn: Date, datePaid: Date) {
        if (!(dateIn instanceof Date) || isNaN(dateIn.getTime())) throw CustomError.badRequest("dateIn must be a valid date");
        if (!(datePaid instanceof Date) || isNaN(datePaid.getTime())) throw CustomError.badRequest("datePaid must be a valid date");
        if (datePaid.getTime() < dateIn.getTime()) throw CustomError.badRequest('datePaid must be >= dateIn');
    }


}