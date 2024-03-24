import React from 'react';
import './Email.css';
import { CommonComponentProps } from '../../types/CommonComponentProps';
import { useContentContext } from '../../contexts/ContentContext';
import { RequiredErrorDiv } from '../RequiredErrorPresenter';
import { useQuestionnaireResponseContent } from '../../contexts/QuestionnaireResponseContext';

type EmailProps = CommonComponentProps;
export function Email(props: EmailProps) {
    const {
        q, 
    } = props;
    const { content } = useContentContext();
    const { 
        collectAnswer,
        bindField,
    } = useQuestionnaireResponseContent();
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
            <RequiredErrorDiv message={content.errorMessageEmail} />
        </>
    );
}
