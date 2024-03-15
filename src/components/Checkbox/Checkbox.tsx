import React from 'react';
import './Checkbox.css';
import { BindFieldFunction, CollectAnswerFunction, ContentData, QData } from '../../types/common';
type InputValue = string | readonly string[] | number | undefined;
type CheckboxProps = {
    attributes: {
        q: QData;
        answers?: Array<string>;
        values: Array<InputValue>;
        bindField: BindFieldFunction; 
        collectAnswer: CollectAnswerFunction;
        content: ContentData;
    };
};
export function Checkbox(props: CheckboxProps) {
    const { attributes } = props;

    const { q, answers, values, bindField, collectAnswer, content } = attributes;
    return (
        <div>
            {answers &&
                answers.map((option, idx) => (
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
