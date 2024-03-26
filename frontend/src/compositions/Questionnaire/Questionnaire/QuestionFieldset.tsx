import React from 'react';

import { OtherComponentProps } from './types';
import { FormElementWrapper } from '../../../components/FormElementWrapper';
import { useContentContext } from '../../../contexts/ContentContext';
import { QuestionInfo } from '../../../types/ApiResults';

type QuestionFieldsetProps = {
    question: QuestionInfo;
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