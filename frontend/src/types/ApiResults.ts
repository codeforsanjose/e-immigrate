import { FormElementName } from "../utilities/formElements";

export type GetQuestionsByLanguageElement = {
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