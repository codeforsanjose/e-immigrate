import React, { useEffect } from 'react';
import './Select.css';

const Select = ({ q, answers, bindField, collectAnswer, content, values }) => {
    useEffect(() => {
        collectAnswer(q.slug, answers[0]);
    }, []);
    return (
        <>
            <select
                name={q.slug}
                required={q.required}
                {...bindField(q.slug)}
                onChange={(e) => collectAnswer(q.slug, e.target.value)}
            >
                {answers &&
                    answers.map((option, idx) => {
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
