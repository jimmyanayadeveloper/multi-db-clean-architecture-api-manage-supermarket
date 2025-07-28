import { ProviderEntity } from "../domain/providers";
import { ProviderPartial } from "../domain/providers/interfaces/provider-partial.interface";

export class Validators {


    static get email() {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    }

    static hasChanges(object: Partial<ProviderPartial>, providerChange: ProviderEntity) {
        const diff = Object.entries(object).reduce((changes, [key, newValue]) => {
            const oldValue = (providerChange as any)[key];
            if (newValue !== undefined && newValue !== oldValue) {
                changes[key] = { old: oldValue, new: newValue }
            }
            return changes;
        }, {} as Record<string, { old: any; new: any }>)

        return {
            hasChanges: Object.keys(diff).length > 0,
            diff
        }
    }

}