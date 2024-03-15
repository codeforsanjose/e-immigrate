import React from 'react';
import './PhoneNumber.css';
import { BindFieldFunction, CollectAnswerFunction, QData, ReactSetter } from '../../types/common';




type PhoneNumberProps = {
    attributes: {
        q: QData;
        bindField: BindFieldFunction;
        collectAnswer: CollectAnswerFunction;
        setErrors: ReactSetter<Record<string, unknown>>;
        content: {
            errorMessagePhone: string;
        };
    }
};
export function PhoneNumber(props: PhoneNumberProps) {
    const {
        attributes: { 
            q, 
            bindField, 
            collectAnswer, 
            setErrors, 
            content,
        },
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
                    } else {
                        setErrors((prev) => ({ ...prev, [q.slug]: false }));
                    }
                    collectAnswer(q.slug, e.target.value);
                } } />
            <div className="RequiredError">*{content.errorMessagePhone}</div>
        </>
    );
}
