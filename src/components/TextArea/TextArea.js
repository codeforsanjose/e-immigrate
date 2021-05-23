import React from 'react';
import './TextArea.css';

const TextArea = ({ attributes }) => {
    const { q, bindField, collectAnswer, content } = attributes;
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

export default TextArea;
