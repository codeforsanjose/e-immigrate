import { getLanguageOrDefault } from "../utilities/languages/DEFAULT_LANGUAGE";
import { replaceSlug, slugPair } from "../utilities/slugs/replaceSlug";
import { apis } from "./apis";

type TitleLanguagePair = {
    title: string;
    language: string;
};

type IdOnlyQuery = {
    id: string;
};
type TitleOnlyQuery = {
    title: string;
};
export const apiUrlFormatters = {
    deleteQuestionnaireResponse: (query: IdOnlyQuery) => {
        return replaceSlug(apis.deleteQuestionnaireResponse, [
            slugPair(':id', query.id),
        ]);
    },
    deleteQuestionnaireByTitle: (query: TitleOnlyQuery) => {
        return replaceSlug(apis.deleteQuestionnaireByTitle, [
            slugPair(':title', query.title),
        ]);
    },
    getQuestionsByLanguage: (query: TitleLanguagePair) => {
        const {
            language,
            title,
        } = query;
        const effectiveLanguage = getLanguageOrDefault(language);
        console.log('getQuestionsByLanguage', { 
            query,
            effectiveLanguage,
        });
        return replaceSlug(apis.getQuestionsByLanguage, [
            slugPair(':title', title),
            slugPair(':language', effectiveLanguage),
        ]);
    },
    getTranslatedContentByLanguage: (query: TitleLanguagePair) => {
        const {
            language,
            title,
        } = query;
        const effectiveLanguage = getLanguageOrDefault(language);
        console.log('getTranslatedContentByLanguage', { 
            query,
            effectiveLanguage,
        });
        return replaceSlug(apis.getTranslatedContentByLanguage, [
            slugPair(':title', title),
            slugPair(':language', effectiveLanguage),
        ]);
    },
};
