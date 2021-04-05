import React, { useEffect, useState } from 'react';

import './FormComponents.css';

export const Date = ({ slug, required, bindField }) => {
    return (
        <>
            <input
                type="date"
                name={slug}
                required={required}
                className="TextInput"
                {...bindField(slug)}
            />
            <div className="RequiredError">*This field is required</div>
        </>
    );
};

export const Radio = ({
    slug,
    required,
    answers,
    bindField,
    collectAnswer,
}) => {
    return (
        <div className="RadioGroup">
            {answers &&
                answers.map((option) => (
                    <div key={`${slug}-${option}`} className="Radio">
                        <label className="RadioLabel">
                            <input
                                type="radio"
                                id={`${slug}-${option}`}
                                name={slug}
                                required={required}
                                value={option}
                                className="RadioButton"
                                {...bindField(slug)}
                                onChange={(e) =>
                                    collectAnswer(slug, e.target.value)
                                }
                            />

                            {option}
                        </label>
                        <span className="RequiredError">
                            *This field is required
                        </span>
                    </div>
                ))}
        </div>
    );
};

export const RadioWithFollowUp = ({
    slug,
    required,
    answers,
    bindField,
    showFollowUp,
    setShowFollowUp,
    collectAnswer,
}) => {
    return (
        <div className="RadioGroup">
            {answers &&
                answers.map((option) => (
                    <div key={`${slug}-${option}`} className="Radio">
                        <label className="RadioLabel">
                            <input
                                type="radio"
                                id={`${slug}-${option}`}
                                name={slug}
                                required={required}
                                value={option}
                                onChange={(e) => {
                                    collectAnswer(slug, e.target.value);
                                    option === 'Yes'
                                        ? setShowFollowUp(true)
                                        : setShowFollowUp(false);
                                }}
                                className="RadioButton"
                                {...bindField(slug)}
                            />
                            {option}
                        </label>
                        <span className="RequiredError">
                            *This field is required
                        </span>
                    </div>
                ))}
        </div>
    );
};

export const Checkbox = ({
    slug,
    required,
    answers,
    bindField,
    collectAnswer,
}) => {
    return (
        <div>
            {answers &&
                answers.map((option) => (
                    <div key={option}>
                        <input
                            type="checkbox"
                            id={`${slug}-${option}`}
                            name={slug}
                            required={required}
                            value={option}
                            {...bindField(slug)}
                            onChange={(e) =>
                                collectAnswer(slug, e.target.value)
                            }
                        />
                        <label for={slug}>{option}</label>
                    </div>
                ))}
        </div>
    );
};

export const TextInput = ({ slug, required, bindField, collectAnswer }) => {
    const [inputState, setInputState] = useState('');
    return (
        <>
            <input
                type="text"
                name={slug}
                required={required}
                className="TextInput"
                {...bindField(slug)}
                onChange={(e) => collectAnswer(slug, e.target.value)}
            />
            <div className="RequiredError">*This field is required</div>
        </>
    );
};

export const TextArea = ({ slug, required, bindField, collectAnswer }) => {
    return (
        <>
            <textarea
                rows="4"
                name={slug}
                required={required}
                className="TextInput"
                {...bindField(slug)}
                onChange={(e) => collectAnswer(slug, e.target.value)}
            />
            <div className="RequiredError">*This field is required</div>
        </>
    );
};

export const DropDown = ({
    slug,
    required,
    answers,
    bindField,
    collectAnswer,
}) => {
    useEffect(() => {
        collectAnswer(slug, answers[0]);
    }, []);

    return (
        <>
            <select
                name={slug}
                required={required}
                {...bindField(slug)}
                onChange={(e) => collectAnswer(slug, e.target.value)}
            >
                {answers &&
                    answers.map((option) => {
                        return (
                            <option key={`${slug}-${option}`}>{option}</option>
                        );
                    })}
            </select>
            <div className="RequiredError">*This field is required</div>
        </>
    );
};

export const Email = ({ slug, required, bindField, collectAnswer }) => {
    return (
        <>
            <input
                type="email"
                id={slug}
                name={slug}
                required={required}
                className="TextInput"
                {...bindField(slug)}
                onChange={(e) => collectAnswer(slug, e.target.value)}
            />
            <div className="RequiredError">
                *This field is required. Please use valid email format
            </div>
        </>
    );
};

export const PhoneNumber = ({ slug, required, bindField, collectAnswer }) => {
    return (
        <>
            <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                id={slug}
                name={slug}
                required={required}
                className="TextInput"
                {...bindField(slug)}
                onChange={(e) => collectAnswer(slug, e.target.value)}
            />
            <div className="RequiredError">
                *This field is required. Please use the following format:
                ###-###-####
            </div>
        </>
    );
};

export const Zip = ({ slug, required, bindField, collectAnswer }) => {
    return (
        <>
            <input
                type="text"
                pattern="[0-9]{5}"
                id={slug}
                name={slug}
                required={required}
                className="TextInput"
                {...bindField(slug)}
                onChange={(e) => collectAnswer(slug, e.target.value)}
            />
            <div className="RequiredError">
                *This field is required. Please use the following format: #####
            </div>
        </>
    );
};
