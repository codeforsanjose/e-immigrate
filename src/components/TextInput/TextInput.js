import React from 'react';
import './TextInput.css';

const TextInput = ({ attributes }) => {
    const { q, bindField, collectAnswer, content } = attributes;
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

export default TextInput;
