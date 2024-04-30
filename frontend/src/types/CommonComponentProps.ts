import { QuestionInfo } from "./ApiResults";

export type CommonComponentProps = {
    q: QuestionInfo;
    type?: 'text' | 'number' | 'email' | 'tel';
};