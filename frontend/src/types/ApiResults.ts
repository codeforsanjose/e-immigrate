import { FormElementName } from "../utilities/formElements";

export type QuestionInfo = {
    id: string;
    slug: string;
    category: string;
    text: string;
    questionType: FormElementName;
    answerSelections: string;
    answerValues: string;
    required: boolean;
    followUpQuestionSlug: string;
    parentQuestionSlug: string;
};

export type GetQuestionsByLanguageApiResponse = {
    title?: string;
    language?: string;
    questions: Array<QuestionInfo>;
};