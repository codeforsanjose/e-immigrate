import React from 'react';
import './Zip.css';
import { ReactSetter } from '../../types/common';
import { CommonComponentAttributes } from '../../types/CommonComponentAttributes';
type ZipProps = {
    attributes: CommonComponentAttributes & {
        setErrors: ReactSetter<Record<string, unknown>>;
    };
};
export function Zip(props: ZipProps) {
    const {
        attributes: { 
            q, 
            bindField, 
            collectAnswer, 
            setErrors, 
            content,
        },
    } = props;
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
                    }
                    else {
                        setErrors((prev) => ({ ...prev, [q.slug]: false }));
                    }
                    collectAnswer(q.slug, e.target.value);
                } } />
            <div className="RequiredError">*{content.errorMessageZip}</div>
        </>
    );
}
