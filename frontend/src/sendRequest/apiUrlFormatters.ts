import { getLanguageOrDefault } from "../utilities/languages/getLanguageOrDefault";
import { replaceSlug, slugPair } from "../utilities/slugs/replaceSlug";
import { apiUrls } from "./apiUrls";

type TitleLanguagePair = {
    /**
     *  Unencoded.
     *
     * @type {string}
     */
    title: string;
    /**
     *  Unencoded.
     *
     * @type {string}
     */
    language: string;
};

type IdOnlyQuery = {
    id: string;
};
type TitleOnlyQuery = {
    title: string;
};

type TitleWithUniqueIdQuery = {
    title: string;
    uniqueId: string;
};
export const apiUrlFormatters = {
    // adminsRouter
    ...{
        deleteQuestionnaireByTitle: (query: TitleOnlyQuery) => {
            return replaceSlug(apiUrls.deleteQuestionnaireByTitle, [
                slugPair(':title', query.title),
            ]);
        },
    },
    // usersRouter
    // generateResponsesExcelRouter
    // questionnaireResponsesRouter
    ...{
        deleteQuestionnaireResponse: (query: IdOnlyQuery) => {
            return replaceSlug(apiUrls.deleteQuestionnaireResponse, [
                slugPair(':id', query.id),
            ]);
        },
    },
    // questionnairesRouter
    ...{
        getQuestionsByLanguage: (query: TitleLanguagePair) => {
            const {
                language,
                title,
            } = query;
            const effectiveLanguage = getLanguageOrDefault(language);
            // console.log('getQuestionsByLanguage', { 
            //     query,
            //     effectiveLanguage,
            // });
            return replaceSlug(apiUrls.getQuestionsByLanguage, [
                slugPair(':title', title),
                slugPair(':language', effectiveLanguage),
            ]);
        },
    },
    // mers questionnaire router
    ...{
        getMersQuestionsByUniqueId: (query: TitleWithUniqueIdQuery) => {
            const {
                uniqueId,
                title,
            } = query;
            return replaceSlug(apiUrls.getMersResportForUniqueId, [
                slugPair(':title', title),
                slugPair(':uniqueId', uniqueId),
            ]);
        },
    },
    // translatedContentRouter
    ...{
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
            return replaceSlug(apiUrls.getTranslatedContentByLanguage, [
                slugPair(':title', title),
                slugPair(':language', effectiveLanguage),
            ]);
        },
    },
};
