import React from 'react';
import './Email.css';

const Email = ({ q, bindField, collectAnswer, content }) => {
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

export default Email;
