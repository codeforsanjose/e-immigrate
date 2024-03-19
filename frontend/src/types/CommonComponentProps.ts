import { ContentText } from "./ContentText";
import { Question } from "./Question";
import { BindFieldFunction, CollectAnswerFunction } from "./common";

export type CommonComponentProps<TContent = ContentText> = {
    q: Question;
    content: TContent;
    bindField: BindFieldFunction;
    collectAnswer: CollectAnswerFunction;
};