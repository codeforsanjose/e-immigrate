type SlugReplacementPair = {
    slug: string;
    replacement: string;
};
export function slugPair(slug: string, replacement: string): SlugReplacementPair {
    return {
        slug,
        replacement,
    };
}
export function replaceSlug(url: string, pairs: SlugReplacementPair | Array<SlugReplacementPair>) {
    const actualPairs = Array.isArray(pairs) ? pairs : [pairs];
    return actualPairs.reduce((prev, current) => {
        const { slug, replacement } = current;
        return prev.replace(slug, encodeURIComponent(replacement));
    }, url);
}