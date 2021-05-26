import React, { useEffect } from 'react';
import './Select.css';

const Select = ({ attributes }) => {
    const {
        q,
        selectAnswers,
        bindField,
        collectAnswer,
        content,
        values,
    } = attributes;
    useEffect(() => {
        collectAnswer(q.slug, selectAnswers[0]);
    }, []);
    return (
        <>
            <select
                name={q.slug}
                required={q.required}
                {...bindField(q.slug)}
                onChange={(e) => collectAnswer(q.slug, e.target.value)}
            >
                {selectAnswers &&
                    selectAnswers.map((option, idx) => {
                        return (
                            <option
                                value={values[idx - 1]}
                                key={`${q.slug}-${option}`}
                            >
                                {option}
                            </option>
                        );
                    })}
            </select>
            <div className="RequiredError">*{content.errorMessage}</div>
        </>
    );
};

export default Select;
