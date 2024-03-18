import { ContentText } from "./ContentText";
import { Question } from "./Question";
import { BindFieldFunction, CollectAnswerFunction } from "./common";

export type CommonComponentAttributes<TContent = ContentText> = {
    bindField: BindFieldFunction;
    collectAnswer: CollectAnswerFunction;
    q: Question;
    content: TContent;
};