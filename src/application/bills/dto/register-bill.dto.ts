import { RegisterBillData } from "../../../domain/bills/dto/register-bill-data";
import { BillPartial } from "../../../domain/bills/interfaces/bill-partial.interface";
import { DtoResult } from "../../../domain/bills/interfaces/response-dto";
import { validationRegisterBill } from "../validate/validation-register-bill-dto";

export class RegisterBillDto implements RegisterBillData {
    providerId: string;
    numberBill: string;
    amountBill: number;
    dateIn: Date;
    payDate: Date;
    isPaid: boolean;

    private constructor(dataBill: RegisterBillData) {
        this.providerId = dataBill.providerId;
        this.numberBill = dataBill.numberBill;
        this.amountBill = dataBill.amountBill;
        this.dateIn = dataBill.dateIn;
        this.payDate = dataBill.payDate;
        this.isPaid = dataBill.isPaid
    }

    static createRegisterBillDto(object: Partial<BillPartial>): DtoResult<RegisterBillDto> {
        const validationResult = validationRegisterBill(object);
        if (!validationResult.ok) return validationResult;
        return { ok: true, value: new RegisterBillDto(validationResult.value) }
    }
}