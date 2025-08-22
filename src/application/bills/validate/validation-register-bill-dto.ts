import { BillPartial } from "../../../domain/bills/interfaces/bill-partial.interface";
import { DtoResult } from "../../../domain/bills/interfaces/response-dto";
import { addUtcDays, dateWithTime } from "../../utils/dates-utc";
import { RegisterBillDto } from "../dto/register-bill.dto";


export function validationRegisterBill(objectIn: Partial<BillPartial>): DtoResult<RegisterBillDto> {
    if (!objectIn) return { ok: false, error: 'Missing data to register bill' };

    const providerId = (objectIn.providerId ?? "").trim();
    const numberBill = (objectIn.numberBill ?? "").trim();

    if (!providerId) return { ok: false, error: 'Missing provider name' };
    if (!numberBill) return { ok: false, error: 'Number bill is required' };

    const amountInputBill = objectIn.amountBill;
    const amountBill = typeof amountInputBill === 'string' ? Number(amountInputBill) : amountInputBill;

    if (amountBill == null || !Number.isFinite(amountBill)) return { ok: false, error: 'Amount bill must be a valid number' }
    if (amountBill < 0) return { ok: false, error: 'Amount bill must be >= 0' };


    const dateIn = objectIn.dateIn ? dateWithTime(objectIn.dateIn) : dateWithTime(new Date());
    if (isNaN(dateIn.getTime())) return { ok: false, error: "Date in bill must be valid" };

    const cd = Math.max(0, Math.trunc(objectIn.creditDays ?? 0));
    if (!Number.isInteger(cd) || cd! < 0) return { ok: false, error: "Credit days must be an integer >= 0" };

    const payDate = addUtcDays(dateIn, cd);
    const isPaid = Boolean(objectIn.isPaid ?? false);

    return {
        ok: true,
        value: { providerId, numberBill, amountBill, dateIn, payDate, isPaid }
    }
}
