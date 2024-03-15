import React from 'react';
import './TextArea.css';
import { QData, BindFieldFunction, CollectAnswerFunction, ReactSetter } from '../../types/common';

type TextAreaProps = {
    attributes: {
        q: QData;
        bindField: BindFieldFunction;
        collectAnswer: CollectAnswerFunction;
        content: {
            errorMessage: string;
        };
    }
};
export function TextArea(props: TextAreaProps) {
    
    const {
        attributes: { 
            q, 
            bindField, 
            collectAnswer, 
            content,
        },
     } = props;

    return (
        <>
            <textarea
                rows={4}
                name={q.slug}
                required={q.required}
                className="TextInput"
                {...bindField(q.slug)}
                onChange={(e) => collectAnswer(q.slug, e.target.value)} />
            <div className="RequiredError">*{content.errorMessage}</div>
        </>
    );
}
