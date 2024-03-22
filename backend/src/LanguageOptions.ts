import { EmailContentLanguages } from "./features/emails/emailContentLanguages.js";

export const WorkshopTitle = 'CIIT_Workshop_Spring_2022';

export type LanguageOptionCodes = EmailContentLanguages | 'ko' | 'pa';
type LanguageOption = {
    code: LanguageOptionCodes;
    full: string;
    englishName: string;
};
export const LanguageOptions: Array<LanguageOption> = [
    {
        code: 'en',
        full: 'English',
        englishName: 'English',
    },
    {
        code: 'es',
        full: 'Español',
        englishName: 'Spanish',
    },
    {
        code: 'vi',
        full: 'Tiếng Việt',
        englishName: 'Vietnamese',
    },
    {
        code: 'tl',
        full: 'Wikang Tagalog',
        englishName: 'Tagalog',
    },
    {
        code: 'cmn',
        full: '普通话',
        englishName: 'Mandarin',
    },
    {
        code: 'yue',
        full: '廣東話',
        englishName: 'Cantonese',
    },
    {
        code: 'ru',
        full: 'русский',
        englishName: 'Russian',
    },
    {
        code: 'am',
        full: 'አማርኛ',
        englishName: 'Amharic',
    },
    {
        code: 'ar',
        full: 'العربية',
        englishName: 'Arabic',
    },

    {
        code: 'fa',
        full: 'فارسی',
        englishName: 'Farsi',
    },
    {
        code: 'hi',
        full: 'हिंदी',
        englishName: 'Hindi',
    },
    {
        code: 'ko',
        full: '한국어',
        englishName: 'Korean',
    },

    {
        code: 'ps',
        full: 'پښتو',
        englishName: 'Pashto',
    },
    {
        code: 'pa',
        full: 'ਪੰਜਾਬੀ',
        englishName: 'Punjabi',
    },
    {
        code: 'pt',
        full: 'português',
        englishName: 'Portuguese',
    },
];

/**
 *   A mapping from 'language code' to 'excel sheet name'
 */
export const ExcelLanguageSheetMap: Partial<Record<LanguageOptionCodes, string | undefined>> = {
    en: 'English',
    es: 'Spanish',
    vi: 'Vietnamese',
    tl: 'TAGALOG',
    cmn: 'MANDARIN',
    yue: 'CANTONESE',
    ru: 'Russian',
    am: 'AMHARIC',
    ar: 'ARABIC',
    fa: 'FARSI',
    hi: 'Hindi',
    ko: 'Korean',
    ps: 'PASHTO',
    pa: 'PUNJABI',
    pt: 'Portuguese',
};

// 

export const TranslatedContentLanguageSheetMap: Partial<Record<LanguageOptionCodes, string | undefined>> = {
    en: 'English',
    es: 'Español',
    vi: 'Tiếng Việt',
    tl: 'Tagalog',
    cmn: 'Mandarin',
    yue: 'Cantonese',
    ru: 'Russian',
    am: 'Amharic',
    ar: 'Arabic',
    fa: 'Farsi',
    hi: 'Hindi',
    ko: 'Korean',
    ps: 'Pashto',
    pa: 'Punjabi ',
    pt: 'Portuguese',
};