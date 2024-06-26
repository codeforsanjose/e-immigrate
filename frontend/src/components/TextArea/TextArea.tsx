import React from 'react';
import './TextArea.css';
import { CommonComponentProps } from '../../types/CommonComponentProps';
import { AutoRequiredErrorDiv } from '../RequiredErrorPresenter';
import { useQuestionnaireResponseContext } from '../../contexts/QuestionnaireResponseContext';

type TextAreaProps = CommonComponentProps;
export function TextArea(props: TextAreaProps) {
    const {
        q,
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
            <textarea
                rows={4}
                name={q.slug}
                required={q.required}
                className="TextArea"
                {...bindField(q.slug)}
                {...{ 'data-touched': showError }}
                onChange={(e) => collectAnswer(q.slug, e.target.value)}
            />
            <AutoRequiredErrorDiv show={showError} />
        </>
    );
}
