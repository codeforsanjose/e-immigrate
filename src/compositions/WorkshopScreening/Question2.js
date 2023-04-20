import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import { answerSelectionRegexSplit } from '../../utilities/utilityFunctions';

const Question2 = ({ q, bindField, setQuestion2, content, collectAnswer }) => {
    const [question2Answer, setQuestion2Answer] = useState(null);
    if (q) {
        const answers = q.answerSelections.split(answerSelectionRegexSplit);
        const values = q.answerValues.split(answerSelectionRegexSplit);
        const onClick = (e) => {
            e.preventDefault();
            setQuestion2(question2Answer);
        };
        return (
            <>
                <div className="RadioGroup">
                    <div className="QuestionText">{q.text}</div>
                    {answers &&
                        answers.map((option, idx) => (
                            <div key={`${q.slug}-${option}`}>
                                <label className="Radio">
                                    <span className="RadioInput">
                                        <input
                                            type="radio"
                                            id={`${q.slug}-${option}`}
                                            name={q.slug}
                                            required={q.required}
                                            value={values[idx]}
                                            className="RadioButton"
                                            {...bindField(q.slug)}
                                            onChange={(e) => {
                                                collectAnswer(
                                                    q.slug,
                                                    e.target.value
                                                );
                                                setQuestion2Answer(
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <span className="RadioControl"></span>
                                    </span>
                                    <span className="RadioLabel">{option}</span>
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
