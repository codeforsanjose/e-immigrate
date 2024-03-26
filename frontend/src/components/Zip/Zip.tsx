import React from 'react';
import './Zip.css';
import { ReactSetter } from '../../types/common';
import { CommonComponentProps } from '../../types/CommonComponentProps';
import { useContentContext } from '../../contexts/ContentContext';
import { RequiredErrorDiv } from '../RequiredErrorPresenter';
import { useQuestionnaireResponseContext } from '../../contexts/QuestionnaireResponseContext';
type ZipProps = CommonComponentProps & {
    setErrors: ReactSetter<Record<string, unknown>>;
};
export function Zip(props: ZipProps) {
    const {
        q, 
        setErrors, 
    } = props;
    const { content } = useContentContext();
    const { 
        collectAnswer,
        bindField, 
    } = useQuestionnaireResponseContext();
    return (
        <>
            <input
                type="text"
                pattern="[0-9]{5}"
                id={q.slug}
                name={q.slug}
                required={q.required}
                className="TextInput"
                {...bindField(q.slug)}
                onChange={(e) => {
                    const state = e.target.checkValidity();
                    // TODO : NEED TO FIX error setting, check validity is working properly but error flag is not propergating
                    setErrors(prev => {
                        if (prev[q.slug] === state) return prev;
                        return {
                            ...prev,
                            [q.slug]: state,
                        };
                    });
                    collectAnswer(q.slug, e.target.value);
                } } />
            <RequiredErrorDiv message={content.errorMessageZip} />
        </>
    );
}
