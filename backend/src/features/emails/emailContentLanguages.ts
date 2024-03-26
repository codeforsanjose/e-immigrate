import { emailContents } from "./emailContents.js";

export type EmailContentLanguages = keyof typeof emailContents;
export function isEmailContentLanguage(value?: string | null | undefined): value is EmailContentLanguages {
    if (value == null) return false;
    else if (value === '') return false;
    return value in emailContents;
}
