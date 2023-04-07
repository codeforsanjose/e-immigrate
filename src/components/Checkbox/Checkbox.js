import React from 'react';
import './Checkbox.css';

const Checkbox = ({ attributes }) => {
    const { q, answers, values, bindField, collectAnswer, content } =
        attributes;
    return (
        <div>
            {answers &&
                answers.map((option, idx) => (
                    <div key={option}>
                        <input
                            type="checkbox"
                            id={`${q.slug}-${option}`}
                            name={q.slug}
                            required={q.required}
                            value={values[idx]}
                            {...bindField(q.slug)}
                            onChange={(e) =>
                                collectAnswer(q.slug, e.target.value)
                            }
                        />
                        <label for={q.slug}>{option}</label>
                        <span className="RequiredError">
                            *{content.errorMessage}
                        </span>
                    </div>
                ))}
        </div>
    );
};

export default Checkbox;
