import React from 'react';
import { Question } from '../../../types/Question';
import { OtherComponentProps } from './types';
import { FormElementWrapper } from '../../../components/FormElementWrapper';
import { useContentContext } from '../../../contexts/ContentContext';

type QuestionFieldsetProps = {
    question: Question;
    others: OtherComponentProps;
};
export function QuestionFieldset(props: QuestionFieldsetProps) {
    const {
        question,
        others,
    } = props;
    const { content } = useContentContext();
    return (
        <fieldset className="Question">
            <div className="QuestionText">
                {question.text}
                {(question.required ?? false)
                    ? ` (${content.required})`
                    : ` (${content.optional})`}
            </div>
            <FormElementWrapper
                elementName={question.questionType}
                others={others}
                question={question}
            />
        </fieldset>
    );
}