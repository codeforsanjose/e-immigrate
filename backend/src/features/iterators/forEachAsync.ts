export async function forEachAsync<T>(items: Array<T>, action: (item: T, index: number, items: Array<T>) => Promise<void>) {
    let index = 0;
    for (const iterator of items) {
        const myIndex = index++;
        await action(iterator, myIndex, items);
    }
}