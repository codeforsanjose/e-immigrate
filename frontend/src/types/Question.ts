import { FormElementName } from "../utilities/formElements";

export type Question = {
    category: string;
    required?: boolean;
    parentQuestionSlug?: string;
    answerSelections?: string;
    slug: string;
    text: string;
    questionType: FormElementName;
};