import React from 'react';
import './Date.css';
import { CommonComponentProps } from '../../types/CommonComponentProps';
import { AutoRequiredErrorDiv } from '../RequiredErrorPresenter';
import { useQuestionnaireResponseContent } from '../../contexts/QuestionnaireResponseContext';

type DateProps = CommonComponentProps;
export function Date(props: DateProps) {
    const {
        q, 
    } = props;
    const {
        bindField,
    } = useQuestionnaireResponseContent();
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
