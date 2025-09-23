import { CustomError } from "../../../../domain";
import { DtoResult } from "../../interfaces/response-dto";
import { addUtcDays, dateWithTime } from "../../../utils/dates-utc";

import { RegisterBillDto } from "../assemblers/register-bill.dto";
import { RegisterBillRequest } from "../../interfaces/dto/request/register.dto";

export function validationRegisterBill(objectIn: RegisterBillRequest): DtoResult<RegisterBillDto> {

    if (!objectIn) return { ok: false, error: CustomError.badRequest('Missing data to register bill') };

    const providerId = (objectIn.provider.id ?? "").trim();
    if (!providerId) return { ok: false, error: CustomError.badRequest('Missing provider id') };

    const providerName = (objectIn.provider.name ?? "").trim();
    if (!providerName) return { ok: false, error: CustomError.badRequest('Missing provider name') };

    const numberBill = (objectIn.numberBill ?? "").trim();
    if (!numberBill) return { ok: false, error: CustomError.badRequest('Number bill is required') };

    const creditDays = (objectIn.creditDays ?? 0)

    const amountInputBill = objectIn.amountBill;
    const amountBill = typeof amountInputBill === 'string' ? Number(amountInputBill) : amountInputBill;
    if (amountBill == null || !Number.isFinite(amountBill)) return { ok: false, error: CustomError.unprocessableEntity('Amount bill must be a valid number') }
    if (amountBill < 0) return { ok: false, error: CustomError.unprocessableEntity('Amount bill must be >= 0') };

    const dateIn = objectIn.dateIn ? dateWithTime(objectIn.dateIn) : dateWithTime(new Date());
    if (isNaN(dateIn.getTime())) return { ok: false, error: CustomError.unprocessableEntity("Date in bill must be valid") };

    const cd = Math.max(0, Math.trunc(creditDays));
    if (!Number.isInteger(cd) || cd! < 0) return { ok: false, error: CustomError.unprocessableEntity("Credit days must be an integer >= 0") };

    const payDate = addUtcDays(dateIn, cd);
    const isPaid = creditDays === 0 ? true : false;

    const provider = { name: providerName, id: providerId }

    return {
        ok: true,
        value: { provider, numberBill, amountBill, dateIn, payDate, isPaid, creditDays }
    }
}
