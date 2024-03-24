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
    setQuestion: (value: string | null) => void;  
};
