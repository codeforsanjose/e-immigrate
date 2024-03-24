import { DEFAULT_LANGUAGE } from "./constants";

export function getEffectiveLanguage(value?: string | undefined | null): string {
    if (value == null) return DEFAULT_LANGUAGE;
    else if (value === '') return DEFAULT_LANGUAGE;
    return value;
}