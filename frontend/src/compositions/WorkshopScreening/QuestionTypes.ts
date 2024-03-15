import { BindFieldFunction, CollectAnswerFunction } from "../../types/common";

export type QuestionProps_Q = {
    category: string;
    answerSelections: string;
    answerValues: string;
    text: string;
    slug: string;
    required?: boolean | undefined;
};
export type QuestionProps = {
    q?: QuestionProps_Q | undefined | null; 
    bindField: BindFieldFunction; 
    setQuestion: (value: string | null) => void;  
    content: {
        errorMessage: string;
        screeningProceedButton: string;
    }; 
    collectAnswer: CollectAnswerFunction;
};
