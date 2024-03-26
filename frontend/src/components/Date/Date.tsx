import React from 'react';
import './Date.css';
import { CommonComponentProps } from '../../types/CommonComponentProps';
import { AutoRequiredErrorDiv } from '../RequiredErrorPresenter';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useQuestionnaireResponseContext, QuestionnaireResponseContext } from '../../contexts/QuestionnaireResponseContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ContentContext } from '../../contexts/ContentContext';
type DateProps = CommonComponentProps;
/**
 *
 *  Depends on {@link QuestionnaireResponseContext}, and
 * {@link ContentContext}.
 *
 * @export
 */
export function Date(props: DateProps) {
    const {
        q, 
    } = props;
    const {
        bindField,
    } = useQuestionnaireResponseContext();
    return (
        <>
            <input
                type="date"
                name={q.slug}
                required={q.required}
                className="TextInput"
                {...bindField(q.slug)} />
            <AutoRequiredErrorDiv />
        </>
    );
}
