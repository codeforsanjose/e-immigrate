import React from "react";
import { getFromStorage, saveToStorage } from "../utilities/storage_utils";
import { apiUrlFormatters } from "../sendRequest/apiUrlFormatters";
import { workshopTitle } from "../data/LanguageOptions";
import { useLanguageContext } from "./LanguageContext";
import { sendRequest } from "../sendRequest/sendRequest";
import { GetQuestionsByLanguageElement } from "../types/ApiResults";

export type LanguageContextState = ReturnType<typeof useInitialQuestionsContextStateFactory>;
export const QuestionsContext = React.createContext<LanguageContextState | undefined>(undefined);
function setupLocalstoreQuestionsWrapper(language: string) {
    const key = `${workshopTitle}-questions-${language}`;
    type DataType = NonNullable<GetQuestionsByLanguageElement>;
    return {
        tryGet: (): Array<DataType> | undefined => {
            // getFromStorage(`${workshopTitle}-content-${LOCALSTORE_LANGUAGE}`) || {}
            const output = getFromStorage<Array<DataType>>(key);
            if (output == null) return;
            else if (!output.success) {
                console.error('Failed to deserialize the value');
                return;
            }
            return output.value.filter(x => x != null);
        },
        set: (value: Array<DataType>) => {
            saveToStorage(key, value);
        },
    };
}
export function useInitialQuestionsContextStateFactory() {
    const {
        language,
    } = useLanguageContext();
    type GetQuestionForLanguageApiResponse = {
        questions: Array<GetQuestionsByLanguageElement>;
    };

    const localStoreQuestionsWrapper = React.useMemo(() => {
        return setupLocalstoreQuestionsWrapper(language);
    }, [language]);
    
    const LOCALSTORE_QUESTIONS = localStoreQuestionsWrapper.tryGet() ?? [];
    const [questions, setQuestions] = React.useState(LOCALSTORE_QUESTIONS);

    React.useEffect(() => {
        async function inner() {
            const requestObj = {
                url: apiUrlFormatters.getQuestionsByLanguage({
                    title: workshopTitle,
                    language,
                }),
            };
            const response = await sendRequest<GetQuestionForLanguageApiResponse | undefined>(requestObj);
            if (response == null) {
                console.log('response was null', {
                    requestObj,
                });
                return;
            }
            setQuestions(response.questions);
            saveToStorage(
                `${workshopTitle}-questions-${language}`,
                response.questions,
            );
        }
        void inner();
        
    }, [language]);

    React.useEffect(() => {
        console.log({ questions });
    }, [questions]);
    
    return React.useMemo(() => {
        return {
            questions,
            setQuestions,
        };
    }, [questions]);
}
export function useQuestionsContext() {
    const context = React.useContext(QuestionsContext);
    if (context == null) throw new Error(`Must be used within a 'QuestionsContext' context.`);
    return context;
}