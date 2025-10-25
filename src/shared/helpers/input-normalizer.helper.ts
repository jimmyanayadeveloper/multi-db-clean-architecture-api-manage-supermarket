// 📂 shared/helpers/input-sanitizer.helper.ts
export class InputNormalizer {
    static str(value: unknown): string | undefined {
        if (typeof value !== "string") return undefined;
        const clean = value.toLowerCase().trim().replace(/[<>"'%;()&+]/g, "");
        return clean.length ? clean : undefined;
    }

    static num(value: unknown): number | undefined {
        if (value == null || value === "") return undefined;
        let numberInput: number;
        if (typeof value === "string") { numberInput = Number(value) }
        else if (typeof value === "number") { numberInput = value }
        else { return undefined }
        return Number.isFinite(numberInput) && (numberInput >= 0) ? numberInput : undefined;
    }

    static int(value: unknown): number | undefined {
        const evenNumber = this.num(value);
        return evenNumber ? Math.trunc(evenNumber) : undefined;
    }

    static bool(value: unknown): boolean | undefined {
        if (typeof value === "boolean") return value;
        if (typeof value === "string") {
            const v = value.toLowerCase().trim();
            if (v === "true" || v === "1") return true;
            if (v === "false" || v === "0") return false;
        }
        return undefined;
    }

    static date(value: unknown): Date | undefined {
        if (!value) return undefined;
        if (!(value instanceof Date)) return undefined
        const date = value;
        return isNaN(date.getTime()) ? undefined : date;
    }
}
