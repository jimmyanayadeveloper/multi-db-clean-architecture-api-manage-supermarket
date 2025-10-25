export class DeepSanitizer {

    static sanitize<T>(obj: T): Partial<T> {
        if (obj === null || obj === undefined || typeof obj !== "object") return {} as Partial<T>;
        const keyValueArrayFilter = Object.entries(obj)
            .map(([key, value]) => {
                if (value === null || value === undefined) return null;
                if (Array.isArray(value)) {
                    const cleanedArray = value
                        .map(item => (typeof item === "object" ? this.sanitize(item) : item))
                        .filter(item => item !== null && item !== undefined);
                    return cleanedArray.length > 0 ? [key, cleanedArray] : null;
                }

                if (typeof value === "object") {
                    const nestedObject = this.sanitize(value);
                    return Object.keys(nestedObject).length > 0 ? [key, nestedObject] : null;
                }

                return [key, value]
            })
            .filter((keyValue): keyValue is [string, any] => keyValue !== null);

        return Object.fromEntries(keyValueArrayFilter) as Partial<T>;
    }
}
