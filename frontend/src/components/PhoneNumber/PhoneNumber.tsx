import React from 'react';
import './PhoneNumber.css';
import { ReactSetter } from '../../types/common';
import { CommonComponentProps } from '../../types/CommonComponentProps';

type PhoneNumberProps = CommonComponentProps & {
    setErrors: ReactSetter<Record<string, unknown>>;
};
export function PhoneNumber(props: PhoneNumberProps) {
    const {
        q, 
        bindField, 
        collectAnswer, 
        setErrors, 
        content,
    } = props;
    return (
        <>
            <input
                type="tel"
                pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$"
                id={q.slug}
                name={q.slug}
                required={q.required}
                className="TextInput"
                {...bindField(q.slug)}
                onChange={(e) => {
                    if (e.target.checkValidity()) {
                        setErrors((prev) => ({ ...prev, [q.slug]: true }));
                    } 
                    else {
                        setErrors((prev) => ({ ...prev, [q.slug]: false }));
                    }
                    collectAnswer(q.slug, e.target.value);
                } } />
            <div className="RequiredError">*{content.errorMessagePhone}</div>
        </>
    );
}
