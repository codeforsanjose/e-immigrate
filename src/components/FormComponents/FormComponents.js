import React, { useEffect } from 'react';

import './FormComponents.css';

export const Date = ({ slug, required, bindField, content }) => {
    return (
        <>
            <input
                type="date"
                name={slug}
                required={required}
                className="TextInput"
                {...bindField(slug)}
            />
            <div className="RequiredError">*{content.errorMessage}</div>
        </>
    );
};

export const Radio = ({
    slug,
    required,
    answers,
    bindField,
    collectAnswer,
    content,
}) => {
    return (
        <div className="RadioGroup">
            {answers &&
                answers.map((option) => (
                    <div key={`${slug}-${option}`}>
                        <label className="Radio">
                            <span className="RadioInput">
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
    slug,
    required,
    answers,
    bindField,
    showFollowUp,
    setShowFollowUp,
    collectAnswer,
    content,
}) => {
    return (
        <div className="RadioGroup">
            {answers &&
                answers.map((option) => (
                    <div key={`${slug}-${option}`}>
                        <label className="Radio">
                            <span className="RadioInput">
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
    slug,
    required,
    answers,
    bindField,
    collectAnswer,
    content,
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

export const TextInput = ({
    slug,
    required,
    bindField,
    collectAnswer,
    content,
}) => {
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
            <div className="RequiredError">*{content.errorMessage}</div>
        </>
    );
};

export const TextArea = ({
    slug,
    required,
    bindField,
    collectAnswer,
    content,
}) => {
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
            <div className="RequiredError">*{content.errorMessage}</div>
        </>
    );
};

export const DropDown = ({
    slug,
    required,
    answers,
    bindField,
    collectAnswer,
    content,
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
            <div className="RequiredError">*{content.errorMessage}</div>
        </>
    );
};

export const Email = ({
    slug,
    required,
    bindField,
    collectAnswer,
    content,
}) => {
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
            <div className="RequiredError">*{content.errorMessageEmail}</div>
        </>
    );
};

export const PhoneNumber = ({
    slug,
    required,
    bindField,
    collectAnswer,
    setErrors,
    content,
}) => {
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
                onChange={(e) => {
                    if (e.target.checkValidity()) {
                        setErrors((prev) => ({ ...prev, [slug]: false }));
                    } else {
                        setErrors((prev) => ({ ...prev, [slug]: true }));
                    }
                    collectAnswer(slug, e.target.value);
                }}
            />
            <div className="RequiredError">*{content.errorMessagePhone}</div>
        </>
    );
};

export const Zip = ({
    slug,
    required,
    bindField,
    collectAnswer,
    setErrors,
    content,
}) => {
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
                onChange={(e) => {
                    if (e.target.checkValidity()) {
                        setErrors((prev) => ({ ...prev, [slug]: false }));
                    } else {
                        setErrors((prev) => ({ ...prev, [slug]: true }));
                    }
                    collectAnswer(slug, e.target.value);
                }}
            />
            <div className="RequiredError">*{content.errorMessageZip}</div>
        </>
    );
};
