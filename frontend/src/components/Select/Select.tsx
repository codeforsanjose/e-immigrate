import React from 'react';
import './Select.css';
import { ReactSetter } from '../../types/common';
import { CommonComponentProps } from '../../types/CommonComponentProps';
import { AutoRequiredErrorDiv } from '../RequiredErrorPresenter';
import { useQuestionnaireResponseContext } from '../../contexts/QuestionnaireResponseContext';
type SelectProps = CommonComponentProps & {
    selectAnswers?: Array<string>;
    values: Array<string>;
    setShowFollowUp: ReactSetter<Record<string, boolean>>;
};
export function Select(props: SelectProps) {
    const {
        q, 
        selectAnswers, 
        values,
    } = props;
    const { 
        collectAnswer,
        bindField,
        questionnaireResponse,
    } = useQuestionnaireResponseContext();

    const valueForSlug = questionnaireResponse[q.slug];
    const showError = valueForSlug == null || valueForSlug === '';

    React.useEffect(() => {
        if (selectAnswers == null) {
            console.error(`'selectAnswers' was null`);
            return;
        }
        collectAnswer(q.slug, selectAnswers[0]);
    }, [collectAnswer, q.slug, selectAnswers]);
    const onChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        collectAnswer(q.slug, e.target.value);
    }, [collectAnswer, q.slug]);
    return (
        <>
            <select
                name={q.slug}
                required={q.required}
                {...bindField(q.slug)}
                onChange={onChange}
            >
                {selectAnswers?.map((option, idx) => {
                    return (
                        <option
                            value={values[idx - 1]}
                            key={`${q.slug}-${option}`}
                        >
                            {option}
                        </option>
                    );
                })}
            </select>
            <AutoRequiredErrorDiv show={showError} />
        </>
    );
}
