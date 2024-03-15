import { BindFieldFunction, CollectAnswerFunction } from "../../types/common";

export type QuestionProps = {
    q?: {
        category: string;
        answerSelections: string;
        answerValues: string;
        text: string;
        slug: string;
        required?: boolean | undefined;
    } | undefined | null; 
    bindField: BindFieldFunction; 
    setQuestion: (value: string | null) => void;  
    content: {
        errorMessage: string;
        screeningProceedButton: string;
    }; 
    collectAnswer: CollectAnswerFunction;
}
