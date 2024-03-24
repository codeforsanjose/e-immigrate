import React from 'react';
import './PhoneNumber.css';
import { ReactSetter } from '../../types/common';
import { CommonComponentProps } from '../../types/CommonComponentProps';
import { useContentContext } from '../../contexts/ContentContext';
import { RequiredErrorDiv } from '../RequiredErrorPresenter';
import { useQuestionnaireResponseContent } from '../../contexts/QuestionnaireResponseContext';

type PhoneNumberProps = CommonComponentProps & {
    setErrors: ReactSetter<Record<string, unknown>>;
};
export function PhoneNumber(props: PhoneNumberProps) {
    const {
        q, 
        setErrors, 
    } = props;
    const { content } = useContentContext();
    const { 
        collectAnswer,
        bindField, 
    } = useQuestionnaireResponseContent();
    return (
        <>
            <input
                type="tel"
                pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}$"
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
            <RequiredErrorDiv message={content.errorMessagePhone} />
        </>
    );
}
