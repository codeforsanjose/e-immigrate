import React from 'react';
import './Radio.css';
import { QData, BindFieldFunction, CollectAnswerFunction } from '../../types/common';
type RadioProps = {
    attributes: {
        q: QData;
        answers?: Array<string>;
        values: Array<string>;
        bindField: BindFieldFunction;
        collectAnswer: CollectAnswerFunction;
        content: {
            errorMessage: string;
        };
    };
};
export function Radio(props: RadioProps) {
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
        <div className="RadioGroup">
            {answers?.map((option, idx) => (
                <div key={`${q.slug}-${idx}`}>
                    <label className="Radio">
                        <span className="RadioInput">
                            <input
                                type="radio"
                                id={`${q.slug}-${option}`}
                                name={q.slug}
                                required={q.required}
                                value={values[idx]}
                                className="RadioButton"
                                {...bindField(q.slug)}
                                onChange={(e) => collectAnswer(q.slug, e.target.value)} />
                            <span className="RadioControl"></span>
                        </span>
                        <span className="RadioLabel">{option}</span>
                    </label>
                    <span className="RequiredError">
                            *{content.errorMessage}
                    </span>
                </div>
            ))}
        </div>
    );
}
