import React from 'react';
import './Email.css';
import { BindFieldFunction, CollectAnswerFunction, ContentData, QData } from '../../types/common';

type EmailProps = {
    attributes: {
        q: QData;
        bindField: BindFieldFunction; 
        content: {
            errorMessageEmail: string;
        };
        collectAnswer: CollectAnswerFunction;
    };
};
export function Email(props: EmailProps) {
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
                type="email"
                id={q.slug}
                name={q.slug}
                required={q.required}
                className="TextInput"
                {...bindField(q.slug)}
                onChange={(e) => collectAnswer(q.slug, e.target.value)} />
            <div className="RequiredError">*{content.errorMessageEmail}</div>
        </>
    );
}
