import React from 'react';
import './Email.css';
import { CommonComponentAttributes } from '../../types/CommonComponentAttributes';

type EmailProps = {
    attributes: CommonComponentAttributes;
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
