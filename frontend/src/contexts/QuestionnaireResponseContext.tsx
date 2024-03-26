import React from "react";
import { useLanguageContext } from "./LanguageContext";
import { BindFieldFunction, CollectAnswerFunction } from "../types/common";
import { WithPersist } from "../types/WithPreventDefault";

export type QuestionnaireResponse = Record<string, unknown>;


type QuestionnaireResponseContentState = ReturnType<typeof useInitialQuestionnaireResponseContentStateFactory>;
export const QuestionnaireResponseContext = React.createContext<QuestionnaireResponseContentState | undefined>(undefined);



type TouchedFields = {
    all: boolean;
} & Record<string, boolean>;

function useMarkFieldAsTouched() {
    const [touchedFields, setTouchedFields] = React.useState<TouchedFields>({ all: false });
    const setFieldAsTouched = React.useCallback((event: WithPersist & { target: { name: string, }, }) => {
        event.persist();
        setTouchedFields((prevState) => ({
            ...prevState,
            [event.target.name]: true,
        }));
    }, []);

    const setAllFieldsTouched = React.useCallback(() => {
        setTouchedFields({ all: true });
    }, []);

    const bindField: BindFieldFunction = React.useCallback((name: string) => {
        return {
            'data-touched': touchedFields.all || touchedFields[name],
            onBlur: setFieldAsTouched,
        };
    }, [setFieldAsTouched, touchedFields]);

    return {
        bindField,
        setAllFieldsTouched,
    };
}

function useInitialQuestionnaireResponseContentStateFactory() {
    const { language } = useLanguageContext();
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

    React.useEffect(() => {
        console.log({
            questionnaireResponse,
        });
    }, [questionnaireResponse]);
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
export function useQuestionnaireResponseContext() {
    const context = React.useContext(QuestionnaireResponseContext);
    if (context == null) throw new Error(`Must be used within a 'QuestionnaireResponseContext' context.`);
    return context;
}

type QuestionnaireResponseContextProviderProps = {
    children: React.ReactNode;
};
export function QuestionnaireResponseContextProvider(props: QuestionnaireResponseContextProviderProps) {
    const { children } = props;
    const context = useInitialQuestionnaireResponseContentStateFactory();
    return (
        <QuestionnaireResponseContext.Provider value={context}>
            {children}
        </QuestionnaireResponseContext.Provider>
    );
}