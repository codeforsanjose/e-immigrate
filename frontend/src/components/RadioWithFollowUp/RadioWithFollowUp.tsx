import React from 'react';
import './RadioWithFollowUp.css';
import { ReactSetter } from '../../types/common';
import { CommonComponentAttributes } from '../../types/CommonComponentAttributes';

type RadioWithFollowUpProps = {
    attributes: CommonComponentAttributes & {
        answers?: Array<string>;
        values: Array<string>;
        setShowFollowUp: ReactSetter<Record<string, boolean>>;
    };
};
export function RadioWithFollowUp(props: RadioWithFollowUpProps) {
    const {
        attributes: {
            q,
            answers,
            values,
            bindField,
            setShowFollowUp,
            collectAnswer,
            content,
        },
    } = props;
    return (
        <div className="RadioGroup">
            {answers?.map((option, idx) => (
                <div key={`${q.slug}-${option}`}>
                    <label className="Radio">
                        <span className="RadioInput">
                            <input
                                type="radio"
                                id={`${q.slug}-${option}`}
                                name={q.slug}
                                required={q.required}
                                value={values[idx]}
                                onChange={(e) => {
                                    collectAnswer(q.slug, e.target.value);
                                    values[idx] === 'Yes'
                                        ? setShowFollowUp((prev) => ({
                                            ...prev,
                                            [q.slug]: true,
                                        }))
                                        : setShowFollowUp((prev) => ({
                                            ...prev,
                                            [q.slug]: false,
                                        }));
                                }}
                                className="RadioButton"
                                {...bindField(q.slug)}
                            />
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
};
