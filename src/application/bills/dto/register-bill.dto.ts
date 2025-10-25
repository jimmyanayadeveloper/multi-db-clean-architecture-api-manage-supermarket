
import { DtoResult } from "../interfaces/response-dto";
import { ProviderMin } from "../../../domain/providers/interfaces/provider-summaries";
import { RegisterBillData, RegisterBillRequest } from "../interfaces/dto/request/register.dto";
import { validationRegisterBill } from "./validation/validation-register-bill-dto";

export class RegisterBillDto implements RegisterBillData {
    provider: ProviderMin
    numberBill: string;
    amountBill: number;
    dateIn: Date;
    payDate: Date;
    isPaid: boolean;
    creditDays: number

    private constructor(dataBill: RegisterBillDto) {
        this.provider = {
            name: dataBill.provider.name,
            id: dataBill.provider.id,
        }
        this.numberBill = dataBill.numberBill,
            this.amountBill = dataBill.amountBill,
            this.dateIn = dataBill.dateIn,
            this.payDate = dataBill.payDate,
            this.isPaid = dataBill.isPaid,
            this.creditDays = dataBill.creditDays = 0
    }

    static create(object: RegisterBillRequest): DtoResult<RegisterBillDto> {
        const validationResult = validationRegisterBill(object);
        if (!validationResult.ok) return validationResult;
        return { ok: true, value: new RegisterBillDto(validationResult.value) }
    }
}