import { ProviderEntity } from "../domain/providers";
import { ProviderPartial } from "../domain/providers/interfaces/provider-partial.interface";

export class Validators {


    static get email() {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    }

    /* 
    * Compare a partial object with a entity of same type and returm that diferents
    * @param object potential changes 
    * @param original entity 
    */
    static hasChanges<T extends object>(object: Partial<T>, original: T) {
        const diff = (Object.keys(object) as (keyof T)[]).reduce((changes, key) => {
            const newValue = object[key];
            const oldValue = original[key];
            if (newValue !== undefined && newValue !== oldValue) {
                changes[key] = { old: oldValue, new: newValue }
            }
            return changes;
        }, {} as Partial<Record<keyof T, { old: any; new: any }>>);

        return {
            hasChanges: Object.keys(diff).length > 0,
            diff
        }
    }

}