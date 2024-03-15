import { FormElementName } from "../utilities/formElements";

export type GetQuestionsByLanguageElement = {
    id: string;
    slug: string;
    category: string;
    questionType: FormElementName;
    answerSelections: string;
    answerSelectionsValues: string;
    text: string;
    required: boolean;
    followUpQuestionSlug: string;
    parentQuestionSlug: string;
};