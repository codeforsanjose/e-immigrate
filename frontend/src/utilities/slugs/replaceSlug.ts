function optionallyEncode(value: string, encode: boolean) {
    if (!encode) return value;
    return encodeURIComponent(value);
}
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

export function replaceSlug(url: string, pairs: SlugReplacementPair | Array<SlugReplacementPair>, encode = true) {
    const actualPairs = Array.isArray(pairs) ? pairs : [pairs];
    return actualPairs.reduce((prev, current) => {
        const { slug, replacement } = current;
        const encodedReplacement = optionallyEncode(replacement, true);
        return prev.replace(slug, encodedReplacement);
    }, url);
}