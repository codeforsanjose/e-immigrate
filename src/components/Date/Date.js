import React from 'react';
import './Date.css';

const Date = ({ q, bindField, content }) => {
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

export default Date;
