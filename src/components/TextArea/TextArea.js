import React from 'react';
import './TextArea.css';

const TextArea = ({ q, bindField, collectAnswer, content }) => {
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
