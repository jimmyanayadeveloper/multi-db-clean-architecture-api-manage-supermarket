import { addUtcDays, dateWithTime } from "../../../utils/dates-utc";
import { CustomError } from "../../../../domain";
import { DtoResult } from "../../interfaces/response-dto";
import { InputNormalizerOrFail } from '../../../../shared/helpers/input-normalizer-or-fail.helper';
import { RegisterBillDto } from "../register-bill.dto";
import { RegisterBillRequest } from "../../interfaces/dto/request/register.dto";

export function validationRegisterBill(objectIn: RegisterBillRequest): DtoResult<RegisterBillDto> {

    try {
        if (!objectIn) return { ok: false, error: CustomError.badRequest('Missing data to register bill') };
        const providerId = InputNormalizerOrFail.str(objectIn.provider.id, 'Provider id');
        const providerName = InputNormalizerOrFail.str(objectIn.provider.name, 'Provider name');
        const numberBill = InputNormalizerOrFail.str(objectIn.numberBill, 'Provider id bill');
        const creditDays = InputNormalizerOrFail.int(objectIn.creditDays, 'Credit days of the bill');
        const amountBill = InputNormalizerOrFail.num(objectIn.amountBill, 'Amount of the bill');
        const dateIn = dateWithTime(InputNormalizerOrFail.date(objectIn.dateIn, 'Date in of the bill'));
        const daysLateToPaid = Math.max(0, creditDays);
        const payDate = addUtcDays(dateIn, daysLateToPaid);
        const isPaid = creditDays === 0 ? true : false;
        const provider = { name: providerName, id: providerId }

        return {
            ok: true,
            value: { provider, numberBill, amountBill, dateIn, payDate, isPaid, creditDays }
        }

    } catch (error) {
        const err = error instanceof CustomError ? error : CustomError.badRequest("Invalid data provided");
        return { ok: false, error: err }
    }
}

