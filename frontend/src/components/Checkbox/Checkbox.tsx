import React from 'react';
import './Checkbox.css';
import { CommonComponentAttributes } from '../../types/CommonComponentAttributes';
type InputValue = string | Array<string> | number | undefined;
type CheckboxProps = {
    attributes: CommonComponentAttributes & {
        answers?: Array<string> | undefined;
        values: Array<InputValue>;
    };
};
export function Checkbox(props: CheckboxProps) {
    const {
        attributes: { 
            q, 
            answers, 
            values, 
            bindField, 
            collectAnswer, 
            content,
        },
    } = props;
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
                    <span className="RequiredError">
                            *{content.errorMessage}
                    </span>
                </div>
            ))}
        </div>
    );
}
