import React from 'react';
import './TextInput.css';
import { CommonComponentProps } from '../../types/CommonComponentProps';
import { AutoRequiredErrorDiv } from '../RequiredErrorPresenter';
import { useQuestionnaireResponseContext } from '../../contexts/QuestionnaireResponseContext';
type TextInputProps = CommonComponentProps;
export function TextInput(props: TextInputProps) {
    const {
        q,
        type = 'text',
    } = props;
    const { 
        collectAnswer,
        bindField,
        questionnaireResponse,
    } = useQuestionnaireResponseContext();
    const valueForSlug = questionnaireResponse[q.slug];
    const showError = valueForSlug == null || valueForSlug === '';
    return (
        <>
            <input
                type={type}
                name={q.slug}
                required={q.required}
                className="TextInput"
                {...bindField(q.slug)}
                {...{ 'data-touched': showError }}
                onChange={(e) => collectAnswer(q.slug, e.target.value)} />
            <AutoRequiredErrorDiv show={showError}/>
        </>
    );
}
