import React from 'react';
import './TextInput.css';
import { CommonComponentProps } from '../../types/CommonComponentProps';
type TextInputProps = CommonComponentProps;
export function TextInput(props: TextInputProps) {
    const {
        q, 
        bindField, 
        collectAnswer, 
        content,
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
