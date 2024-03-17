export const DEFAULT_LANGUAGE = 'en' as const;
export function getLanguageOrDefault<T extends string = string>(language: T) {
    if (language == null || language === '') return DEFAULT_LANGUAGE;
    return language;
}