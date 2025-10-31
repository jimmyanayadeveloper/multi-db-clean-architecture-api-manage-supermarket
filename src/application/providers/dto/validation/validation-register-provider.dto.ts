
import { CustomError } from "../../../../domain";
import { RegisterProviderRequest } from "../interfaces/request/register-provider.dto";
import { RegisterProviderDto } from "../create-provider-dto";
import { InputNormalizerOrFail } from "../../../../shared/helpers/input-normalizer-or-fail.helper";

export function validationRegisterProvider(objectIn: RegisterProviderRequest): RegisterProviderDto {

    try {
        if (!objectIn) throw CustomError.badRequest('Missing data to create a provider')
        const name = InputNormalizerOrFail.str(objectIn.name.toLowerCase(), "Name provider ");
        const nit = InputNormalizerOrFail.str(objectIn.nit.trim(), "Nit provider ");
        const salesman = InputNormalizerOrFail.str(objectIn.salesman.toLowerCase(), "Salesman provider ");
        const withHoldingsTaxes = InputNormalizerOrFail.bool(objectIn.withholdingsTaxes, "Provider with holding taxes ");
        const creditBalance = InputNormalizerOrFail.num(objectIn.creditBalance, "Money that us owe provider");
        const creditDays = InputNormalizerOrFail.int(objectIn.creditDays, "Credit days provider allowed");
        const allowedCredit = InputNormalizerOrFail.bool(objectIn.saleWithCredit, "Provider sale with credit ");
        if (!allowedCredit) {
            if (creditDays !== 0 || creditBalance !== 0) throw CustomError.badRequest("This provider don't allow sale with credit, creditDays and creditBalance shall be 0")
        }
        const providerNormalized = { name, nit, salesman, creditBalance, withHoldingsTaxes, allowedCredit, creditDays }
        return providerNormalized
    }
    catch (error) {
        throw CustomError.badRequest("Invalid data provided");
    }
}