import { CustomError } from "../../errors/custom.error";

export class ProviderValidators {
    static ValidateName(name: string) {
        if (!name || name.trim().length < 3)
            throw CustomError.badRequest("Provider name is required");
    }
    static ValidateNit(nit: string) {
        if (!nit)
            throw CustomError.badRequest("Nit provider is required");

        if (!/^\d{8,12}$/.test(nit))
            throw CustomError.badRequest("Nit must be 8 - 12 digits");
    }
    static ValidateCreditBalance(creditBalance: number, creditDays: number) {
        if (creditBalance < 0)
            throw CustomError.badRequest("Credit balance can't be negative");
        if (creditBalance > 0 && creditDays <= 0)
            throw CustomError.badRequest("Credit provider is not allowed");
    }
}