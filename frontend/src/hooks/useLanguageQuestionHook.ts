import React from "react";
import { QuestionInfo } from "../types/ApiResults";
import { api } from "../sendRequest/api";

export function useLanguageQuestionHook(config: {
    title?: string;
    language?: string;
}) {
    const {
        title,
        language,
    } = config;
    const [questions, setQuestions] = React.useState<Array<QuestionInfo>>([]);

    React.useEffect(() => {
        async function inner() {
            const response = await api.getQuestionsByLanguage({
                title,
                language,
            });
            if (response == null) return;
            console.debug('useLanguageQuestionHook', {
                response: response.questions,
            });
            setQuestions(response.questions);
        }
        void inner();
    }, [language, setQuestions, title]);
    return {
        questions,
        setQuestions,
    };
}