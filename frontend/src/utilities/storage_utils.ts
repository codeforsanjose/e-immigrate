export function saveToStorage(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
}

type GetFromStorageResult<T> =
| {
    success: true;
    value: T;
}
| {
    success: false;
    item: string;
};
export function getFromStorage<T>(key: string): GetFromStorageResult<T> | undefined {
    const item = localStorage.getItem(key);
    if (item == null) return;
    try {
        return {
            success: true,
            value: JSON.parse(item),
        };
    }
    catch {
        return {
            success: false,
            item,
        };
    }
}
