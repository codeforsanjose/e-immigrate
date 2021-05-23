import React from 'react';
import './RadioWithFollowUp.css';

const RadioWithFollowUp = ({ attributes }) => {
    const {
        q,
        answers,
        values,
        bindField,
        setShowFollowUp,
        collectAnswer,
        content,
    } = attributes;
    return (
        <div className="RadioGroup">
            {answers &&
                answers.map((option, idx) => (
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
                                            ? setShowFollowUp(true)
                                            : setShowFollowUp(false);
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

export default RadioWithFollowUp;
