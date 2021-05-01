import React, { useEffect } from 'react';

import './FormComponents.css';

export const Date = ({ q, bindField, content }) => {
    return (
        <>
            <input
                type="date"
                name={q.slug}
                required={q.required}
                className="TextInput"
                {...bindField(q.slug)}
            />
            <div className="RequiredError">*{content.errorMessage}</div>
        </>
    );
};

export const Radio = ({
    q,
    answers,
    values,
    bindField,
    collectAnswer,
    content,
}) => {
    return (
        <div className="RadioGroup">
            {answers &&
                answers.map((option, idx) => (
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
                                    onChange={(e) =>
                                        collectAnswer(q.slug, e.target.value)
                                    }
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

export const RadioWithFollowUp = ({
    q,
    answers,
    values,
    bindField,
    showFollowUp,
    setShowFollowUp,
    collectAnswer,
    content,
}) => {
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

export const Checkbox = ({
    q,
    answers,
    values,
    bindField,
    collectAnswer,
    content,
}) => {
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
                            onChange={(e) =>
                                collectAnswer(q.slug, e.target.value)
                            }
                        />
                        <label for={q.slug}>{option}</label>
                    </div>
                ))}
        </div>
    );
};

export const TextInput = ({ q, bindField, collectAnswer, content }) => {
    return (
        <>
            <input
                type="text"
                name={q.slug}
                required={q.required}
                className="TextInput"
                {...bindField(q.slug)}
                onChange={(e) => collectAnswer(q.slug, e.target.value)}
            />
            <div className="RequiredError">*{content.errorMessage}</div>
        </>
    );
};

export const TextArea = ({ q, bindField, collectAnswer, content }) => {
    return (
        <>
            <textarea
                rows="4"
                name={q.slug}
                required={q.required}
                className="TextInput"
                {...bindField(q.slug)}
                onChange={(e) => collectAnswer(q.slug, e.target.value)}
            />
            <div className="RequiredError">*{content.errorMessage}</div>
        </>
    );
};

export const DropDown = ({
    q,
    answers,
    bindField,
    collectAnswer,
    content,
    values,
}) => {
    useEffect(() => {
        collectAnswer(q.slug, answers[0]);
    }, []);

    return (
        <>
            <select
                name={q.slug}
                required={q.required}
                {...bindField(q.slug)}
                onChange={(e) => collectAnswer(q.slug, e.target.value)}
            >
                {answers &&
                    answers.map((option, idx) => {
                        return (
                            <option
                                value={values[idx]}
                                key={`${q.slug}-${option}`}
                            >
                                {option}
                            </option>
                        );
                    })}
            </select>
            <div className="RequiredError">*{content.errorMessage}</div>
        </>
    );
};

export const Email = ({ q, bindField, collectAnswer, content }) => {
    return (
        <>
            <input
                type="email"
                id={q.slug}
                name={q.slug}
                required={q.required}
                className="TextInput"
                {...bindField(q.slug)}
                onChange={(e) => collectAnswer(q.slug, e.target.value)}
            />
            <div className="RequiredError">*{content.errorMessageEmail}</div>
        </>
    );
};

export const PhoneNumber = ({
    q,
    bindField,
    collectAnswer,
    setErrors,
    content,
}) => {
    return (
        <>
            <input
                type="tel"
                pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$"
                id={q.slug}
                name={q.slug}
                required={q.required}
                className="TextInput"
                {...bindField(q.slug)}
                onChange={(e) => {
                    if (e.target.checkValidity()) {
                        setErrors((prev) => ({ ...prev, [q.slug]: false }));
                    } else {
                        setErrors((prev) => ({ ...prev, [q.slug]: true }));
                    }
                    collectAnswer(q.slug, e.target.value);
                }}
            />
            <div className="RequiredError">*{content.errorMessagePhone}</div>
        </>
    );
};

export const Zip = ({ q, bindField, collectAnswer, setErrors, content }) => {
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
                    if (e.target.checkValidity()) {
                        setErrors((prev) => ({ ...prev, [q.slug]: false }));
                    } else {
                        setErrors((prev) => ({ ...prev, [q.slug]: true }));
                    }
                    collectAnswer(q.slug, e.target.value);
                }}
            />
            <div className="RequiredError">*{content.errorMessageZip}</div>
        </>
    );
};
