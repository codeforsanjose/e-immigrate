export const saveToStorage = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = (key: string) => {
    const item = localStorage.getItem(key);
    if (item == null) return;
    try {
        return JSON.parse(item);
    } catch {
        return item;
    }
};
