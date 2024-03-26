import React from "react";
import { workshopTitle } from "../data/LanguageOptions";
import { useLanguageContext } from "./LanguageContext";
import { QuestionInfo } from "../types/ApiResults";
import { createLocalStorageWrapper } from "../utilities/storage/createLocalStorageWrapper";
import { api } from "../sendRequest/api";

export type LanguageContextState = ReturnType<typeof useInitialQuestionsContextStateFactory>;
export const QuestionsContext = React.createContext<LanguageContextState | undefined>(undefined);
function setupLocalstoreQuestionsWrapper(language: string) {
    const key = `${workshopTitle}-questions-${language}`;
    type DataType = NonNullable<QuestionInfo>;
    return createLocalStorageWrapper<Array<DataType>>(key);
}
function useInitialQuestionsContextStateFactory() {
    const {
        language,
    } = useLanguageContext();

    const localStoreQuestionsWrapper = React.useMemo(() => {
        return setupLocalstoreQuestionsWrapper(language);
    }, [language]);
    
    const LOCALSTORE_QUESTIONS = localStoreQuestionsWrapper.tryGet() ?? [];
    const [questions, setQuestions] = React.useState(LOCALSTORE_QUESTIONS);

    React.useEffect(() => {
        async function inner() {
            const result = await api.getQuestionsByLanguage({
                title: workshopTitle,
                language,
            });
            if (result == null) return;
            setQuestions(result.questions);
            localStoreQuestionsWrapper.set(result.questions);
        }
        void inner();
        
    }, [language, localStoreQuestionsWrapper]);
    
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
type QuestionContextProviderProps = {
    children: React.ReactNode;
};
export function QuestionContextProvider(props: QuestionContextProviderProps) {
    const { children } = props;
    const questionsContextState = useInitialQuestionsContextStateFactory();
    // children
    return (
        <QuestionsContext.Provider value={questionsContextState}>
            {children}
        </QuestionsContext.Provider>
    );
}