
import { CustomError } from "../../../../domain";
import { DtoResult } from "../../../bills/interfaces/response-dto";
import { RegisterProviderRequest } from "../interfaces/request/register-provider.dto";
import { RegisterProviderDto } from "../create-provider-dto";
import { InputNormalizerOrFail } from "../../../../shared/helpers/input-normalizer-or-fail.helper";

export function validationRegisterProvider(objectIn: RegisterProviderRequest): DtoResult<RegisterProviderDto> {

    try {
        if (!objectIn) return { ok: false, error: CustomError.badRequest('Missing data to create a provider') };
        const name = InputNormalizerOrFail.str(objectIn.name.toLowerCase(), "Name provider ");
        const nit = InputNormalizerOrFail.str(objectIn.nit.trim(), "Nit provider ");
        const salesman = InputNormalizerOrFail.str(objectIn.salesman.toLowerCase(), "Salesman provider ");
        const withHoldingsTaxes = InputNormalizerOrFail.bool(objectIn.withholdingsTaxes, "Provider with holding taxes ");
        const creditBalance = InputNormalizerOrFail.num(objectIn.creditBalance, "Money that us owe provider");
        const creditDays = InputNormalizerOrFail.int(objectIn.creditDays, "Credit days provider allowed");
        const allowedCredit = InputNormalizerOrFail.bool(objectIn.saleWithCredit, "Provider sale with credit ");
        if (!allowedCredit) {
            if (creditDays !== 0 || creditBalance !== 0) {
                return { ok: false, error: CustomError.badRequest("This provider don't allow sale with credit, creditDays and creditBalance shall be 0") }
            }
        }
        return {
            ok: true,
            value: { name, nit, salesman, creditBalance, withHoldingsTaxes, allowedCredit, creditDays }
        }
    } catch (error) {
        const err = error instanceof CustomError ? error : CustomError.badRequest("Invalid data provided");
        return { ok: false, error: err }
    }
}