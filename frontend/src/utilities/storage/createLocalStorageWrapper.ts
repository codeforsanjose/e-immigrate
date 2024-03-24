import { getFromStorage, saveToStorage } from "./storage_utils";



export function createLocalStorageWrapper<TValue, TKey extends string = string>(key: TKey) {
    return {
        tryGet: (): TValue | undefined => {
            const output = getFromStorage<TValue>(key);
            if (output == null) return;
            else if (!output.success) {
                console.error('Failed to deserialize the value');
                return;
            }
            return output.value;
        },
        set: (value: TValue) => {
            saveToStorage(key, value);
        },
    };
}
