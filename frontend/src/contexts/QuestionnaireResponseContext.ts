import React from "react";
import { useLanguageContext } from "./LanguageContext";
import { CollectAnswerFunction } from "../types/common";
import { useMarkFieldAsTouched } from "../compositions/Questionnaire/hooks/useMarkFieldAsTouched";
export type QuestionnaireResponse = Record<string, unknown>;
type QuestionnaireResponseContentState = ReturnType<typeof useInitialQuestionnaireResponseContentStateFactory>;
export const QuestionnaireResponseContent = React.createContext<QuestionnaireResponseContentState | undefined>(undefined);
export function useInitialQuestionnaireResponseContentStateFactory() {
    const {
        language,
    } = useLanguageContext();
    const [questionnaireResponse, setQuestionnaireResponse] = React.useState<QuestionnaireResponse>({
        languageCode: language,
    });
    const {
        bindField,
        setAllFieldsTouched,
    } = useMarkFieldAsTouched();
    React.useEffect(() => {
        setQuestionnaireResponse(current => {
            return {
                ...current,
                languageCode: language,
            };
        });
    }, [language]);
    const collectAnswer: CollectAnswerFunction = React.useCallback((slug: string, answer: unknown) => {
        // answeredQuestion[slug] = answer;
        setQuestionnaireResponse(current => {
            return {
                ...current,
                [slug]: answer,
            };
        });
    }, [setQuestionnaireResponse]);
    return React.useMemo(() => {
        return {
            questionnaireResponse,
            setQuestionnaireResponse,
            collectAnswer,
            bindField,
            setAllFieldsTouched,
        };
    }, [bindField, collectAnswer, questionnaireResponse, setAllFieldsTouched]);
}
export function useQuestionnaireResponseContent() {
    const context = React.useContext(QuestionnaireResponseContent);
    if (context == null) throw new Error(`Must be used within a 'QuestionnaireResponseContent' context.`);
    return context;
}