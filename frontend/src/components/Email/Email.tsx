import React from 'react';
import './Email.css';
import { CommonComponentProps } from '../../types/CommonComponentProps';
import { RequiredErrorDiv } from '../RequiredErrorPresenter';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useQuestionnaireResponseContext, QuestionnaireResponseContext } from '../../contexts/QuestionnaireResponseContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ContentContext, useContentContext } from '../../contexts/ContentContext';
type EmailProps = CommonComponentProps;
/**
 *
 *  Depends on {@link QuestionnaireResponseContext}, and
 * {@link ContentContext}.
 *
 * @export
 */
export function Email(props: EmailProps) {
    const {
        q, 
    } = props;
    const { content } = useContentContext();
    const { 
        collectAnswer,
        bindField,
    } = useQuestionnaireResponseContext();
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
