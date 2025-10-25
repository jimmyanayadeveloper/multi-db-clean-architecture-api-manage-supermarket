import { CustomError } from "../../domain";
import { validate as uuidValidate } from 'uuid';

export class InputNormalizerOrFail {
    static str(value: unknown, field: string): string {
        if (typeof value !== "string") throw CustomError.badRequest(`${field} is requierd and must be a string`);
        const clean = value.toLowerCase().trim().replace(/[<>"'%;()&+]/g, "");
        if (!clean) throw CustomError.badRequest(`${field} is required or invalid`);
        return clean;
    }

    static num(value: unknown, field: string): number {
        if (value == null || value === "") throw CustomError.badRequest(`${field} is requierd`);
        const numberInput = typeof value === "string" ? Number(value) : (value as number);
        if (!Number.isFinite(numberInput)) throw CustomError.badRequest(`${field} is invalid`);
        if (numberInput < 0) throw CustomError.badRequest(`${field} must be a positive number`)
        return numberInput;
    }

    static int(value: unknown, field: string): number {
        const evenNumber = this.num(value, field);
        return Math.trunc(evenNumber);
    }

    static bool(value: unknown, field: string): boolean {
        if (typeof value === "boolean") return value;
        if (typeof value === "string") {
            const valueNormalized = value.toLocaleLowerCase().trim();
            if (valueNormalized === "true" || valueNormalized === "1") return true;
            if (valueNormalized === "false" || valueNormalized === "0") return false;
        }
        throw CustomError.badRequest(`${field} is invalid must be true or false`);
    }

    static date(value: unknown, field: string): Date {
        if (value === null) throw CustomError.badRequest(`${field} is requierd`);
        const date = value instanceof Date ? value : new Date(value as any);
        if (isNaN(date.getTime())) throw CustomError.badRequest(`${field} must be a valid date format`);
        return date;
    }

    static uuid(value: any, field: string): string {
        if (typeof value !== 'string' || !uuidValidate(value))
            throw CustomError.badRequest(`${field} must be a valid UUID`);
        return value;
    }
}


