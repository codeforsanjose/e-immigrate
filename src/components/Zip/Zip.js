import React from 'react';
import './Zip.css';

const Zip = ({ q, bindField, collectAnswer, setErrors, content }) => {
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
                    // TODO : NEED TO FIX error setting, check validity is working properly but error flag is not propergating
                    if (e.target.checkValidity()) {
                        setErrors((prev) => ({ ...prev, [q.slug]: true }));
                    } else {
                        setErrors((prev) => ({ ...prev, [q.slug]: false }));
                    }
                    collectAnswer(q.slug, e.target.value);
                }}
            />
            <div className="RequiredError">*{content.errorMessageZip}</div>
        </>
    );
};

export default Zip;
