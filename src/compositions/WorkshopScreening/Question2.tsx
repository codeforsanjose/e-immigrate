import React from 'react';
import { Button } from '../../components/Button/Button';
import { QuestionProps } from './QuestionTypes';
import { WithPreventDefault } from "../../types/WithPreventDefault";

export function Question2(props: QuestionProps) {
    const { 
        q, 
        bindField, 
        setQuestion: setQuestion2, 
        content, 
        collectAnswer,
    } = props;
    const [question2Answer, setQuestion2Answer] = React.useState<string | null>(null);
    if (q == null) return null;
    const answers = q.answerSelections.split(', ');
    const values = q.answerValues.split(', ');
    const onClick = (e: WithPreventDefault) => {
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
                                        } } />
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
                    onClick={onClick} />
            </div>
        </>
    );
    
}
