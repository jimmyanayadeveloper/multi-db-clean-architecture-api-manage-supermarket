
import { RegisterBillRequest } from "../../../domain/bills/interface/dto/update-bill-request.interface";
import { ProviderMin } from "../../../domain/providers/interfaces/provider-summaries";
import { validationRegisterBill } from "./validation/validation-register-bill-dto";

export class RegisterBillDto {
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

    static create(object: RegisterBillRequest): RegisterBillDto {
        const billValidate = validationRegisterBill(object);
        return new RegisterBillDto(billValidate)
    }
}