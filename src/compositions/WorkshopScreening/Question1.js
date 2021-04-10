import React, { useState } from 'react';
import Button from '../../components/Button/Button';

const Question1 = ({ q, bindField, setQuestion1, content, collectAnswer }) => {
    const [question1Answer, setQuestion1Answer] = useState(null);
    if (q) {
        const answers = q.answerSelections.split(', ');
        const onClick = (e) => {
            e.preventDefault();
            setQuestion1(question1Answer);
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
                                            setQuestion1Answer(e.target.value);
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

export default Question1;
