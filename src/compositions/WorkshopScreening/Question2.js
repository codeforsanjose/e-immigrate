import React, { useState } from 'react';
import Button from '../../components/Button/Button';

const Question2 = ({ q, bindField, setQuestion2, content, collectAnswer }) => {
    const [question2Answer, setQuestion2Answer] = useState(null);
    if (q) {
        const answers = q.answerSelections.split(', ');
        const onClick = (e) => {
            e.preventDefault();
            setQuestion2(question2Answer);
        };
        return (
            <>
                <div className="RadioGroup">
                    <div className="QuestionText">{q.text}</div>
                    {answers &&
                        answers.map((option) => (
                            <div key={`${q.slug}-${option}`} className="Radio">
                                <label className="RadioLabel">
                                    <input
                                        type="radio"
                                        id={`${q.slug}-${option}`}
                                        name={q.slug}
                                        required={q.required}
                                        value={option}
                                        className="RadioButton"
                                        {...bindField(q.slug)}
                                        onChange={(e) => {
                                            collectAnswer(
                                                q.slug,
                                                e.target.value
                                            );
                                            setQuestion2Answer(e.target.value);
                                        }}
                                    />
                                    {option}
                                </label>
                                <span className="RequiredError">
                                    *{content.errorMessage}
                                </span>
                            </div>
                        ))}
                    <Button
                        type="submit"
                        label={content.screeningProceedButton}
                        onClick={onClick}
                    />
                </div>
            </>
        );
    } else {
        return null;
    }
};

export default Question2;
