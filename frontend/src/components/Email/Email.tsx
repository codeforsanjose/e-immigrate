import React from 'react';
import './Email.css';
import { CommonComponentProps } from '../../types/CommonComponentProps';

type EmailProps = CommonComponentProps;
export function Email(props: EmailProps) {
    const {
        q, 
        bindField, 
        collectAnswer, 
        content,
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
