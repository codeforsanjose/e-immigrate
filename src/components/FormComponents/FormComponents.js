import React from 'react';

import './FormComponents.css';

export const Date = ({ slug, required, bindField }) => {
    return (
        <input
            type="date"
            name={slug}
            required={required}
            className="TextInput"
            // {...bindField(slug)}
        />
    );
};

export const Radio = ({ slug, required, answers, bindField }) => {
    return (
        <div className="RadioGroup">
            {answers &&
                answers.map((option) => (
                    <div key={`${slug}-${option}`} className="Radio">
                        <input
                            type="radio"
                            id={`${slug}-${option}`}
                            name={slug}
                            required={required}
                            value={option}
                            className="RadioButton"
                            {...bindField(slug)}
                        />
                        <label htmlFor={slug} className="RadioLabel">
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

export const Checkbox = ({ slug, required, answers, bindField }) => {
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
                        />
                        <label for={slug}>{option}</label>
                    </div>
                ))}
        </div>
    );
};

export const TextInput = ({ slug, required, bindField }) => {
    return (
        <input
            type="text"
            name={slug}
            required={required}
            className="TextInput"
            {...bindField(slug)}
        />
    );
};

export const TextArea = ({ slug, required, bindField }) => {
    return (
        <textarea
            rows="4"
            cols="50"
            name={slug}
            required={required}
            className="TextInput"
            {...bindField(slug)}
        />
    );
};

export const DropDown = ({ slug, required, answers, bindField }) => {
    return (
        <select name={slug} required={required} {...bindField(slug)}>
            {answers &&
                answers.map((option) => {
                    return <option key={`${slug}-${option}`}>{option}</option>;
                })}
        </select>
    );
};

export const Email = ({ slug, required, bindField }) => {
    return (
        <input
            type="email"
            id={slug}
            name={slug}
            required={required}
            className="TextInput"
            {...bindField(slug)}
        />
    );
};

export const PhoneNumber = ({ slug, required, bindField }) => {
    return (
        <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            id={slug}
            name={slug}
            required={required}
            className="TextInput"
            {...bindField(slug)}
        />
    );
};

export const Zip = ({ slug, required, bindField }) => {
    return (
        <input
            type="text"
            pattern="[0-9]*"
            id={slug}
            name={slug}
            required={required}
            className="TextInput"
            {...bindField(slug)}
        />
    );
};
