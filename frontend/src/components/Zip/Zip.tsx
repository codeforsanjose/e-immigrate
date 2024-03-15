import React from 'react';
import './Zip.css';
import { QData, BindFieldFunction, CollectAnswerFunction, ReactSetter } from '../../types/common';
type ZipProps = {
    attributes: {
        q: QData;
        bindField: BindFieldFunction;
        collectAnswer: CollectAnswerFunction;
        setErrors: ReactSetter<Record<string, unknown>>;
        content: {
            errorMessageZip: string;
        };
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
