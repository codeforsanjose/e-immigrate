import { QuestionInfo } from "../../types/ApiResults";

export type SetQuestionDelegate = (value: string | null) => void;
export type QuestionProps = {
    q?: QuestionInfo | undefined | null; 
    setQuestion: SetQuestionDelegate;
};
