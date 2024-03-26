import React from 'react';
import './Checkbox.css';
import { CommonComponentProps } from '../../types/CommonComponentProps';
import { AutoRequiredErrorSpan } from '../RequiredErrorPresenter';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useQuestionnaireResponseContext, QuestionnaireResponseContext } from '../../contexts/QuestionnaireResponseContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ContentContext } from '../../contexts/ContentContext';
type InputValue = string | Array<string> | number | undefined;
type CheckboxProps = CommonComponentProps & {
    answers?: Array<string> | undefined;
    values: Array<InputValue>;
};

/**
 *
 *  Depends on {@link QuestionnaireResponseContext}, and
 * {@link ContentContext}.
 *
 * @export
 */
export function Checkbox(props: CheckboxProps) {
    const {
        q, 
        answers, 
        values, 
    } = props;
    const { 
        collectAnswer,
        bindField, 
    } = useQuestionnaireResponseContext();
    return (
        <div>
            {answers?.map((option, idx) => (
                <div key={option}>
                    <input
                        type="checkbox"
                        id={`${q.slug}-${option}`}
                        name={q.slug}
                        required={q.required}
                        value={values[idx]}
                        {...bindField(q.slug)}
                        onChange={(e) => collectAnswer(q.slug, e.target.value)} />
                    <label htmlFor={q.slug}>{option}</label>
                    <AutoRequiredErrorSpan />
                </div>
            ))}
        </div>
    );
}
