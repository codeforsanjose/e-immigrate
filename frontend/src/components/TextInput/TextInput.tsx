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
    } = useQuestionnaireResponseContext();
    return (
        <>
            <input
                type={type}
                name={q.slug}
                required={q.required}
                className="TextInput"
                {...bindField(q.slug)}
                onChange={(e) => collectAnswer(q.slug, e.target.value)} />
            <AutoRequiredErrorDiv />
        </>
    );
}
