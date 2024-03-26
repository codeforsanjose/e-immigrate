import React from 'react';
import './PhoneNumber.css';
import { ReactSetter } from '../../types/common';
import { CommonComponentProps } from '../../types/CommonComponentProps';
import { useContentContext } from '../../contexts/ContentContext';
import { RequiredErrorDiv } from '../RequiredErrorPresenter';
import { useQuestionnaireResponseContext } from '../../contexts/QuestionnaireResponseContext';

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
    } = useQuestionnaireResponseContext();
    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const isValid = e.target.checkValidity();
        setErrors(prev => {
            if (prev[q.slug] === isValid) return prev;
            return { 
                ...prev, 
                [q.slug]: isValid,
            };
        });
        collectAnswer(q.slug, e.target.value);
    }, [collectAnswer, q.slug, setErrors]);
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
                onChange={onChange} />
            <RequiredErrorDiv message={content.errorMessagePhone} />
        </>
    );
}
