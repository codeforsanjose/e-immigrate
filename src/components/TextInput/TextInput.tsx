import React from 'react';
import './TextInput.css';
import { QData, BindFieldFunction, CollectAnswerFunction, ReactSetter } from '../../types/common';
type TextInputProps = {
    attributes: {
        q: QData;
        bindField: BindFieldFunction;
        collectAnswer: CollectAnswerFunction;
        content: {
            errorMessage: string;
        };
    }
};
export function TextInput(props: TextInputProps) {
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
            <input
                type="text"
                name={q.slug}
                required={q.required}
                className="TextInput"
                {...bindField(q.slug)}
                onChange={(e) => collectAnswer(q.slug, e.target.value)} />
            <div className="RequiredError">*{content.errorMessage}</div>
        </>
    );
}
