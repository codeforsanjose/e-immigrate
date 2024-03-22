import React from 'react';
import { Button } from '../../components/Button/Button';
import { QuestionProps } from './QuestionTypes';
import { WithPreventDefault } from "../../types/WithPreventDefault";

export function Question1(props: QuestionProps) {
    const {
        bindField,
        collectAnswer,
        content,
        q,
        setQuestion: setQuestion1,
    } = props;
    const [question1Answer, setQuestion1Answer] = React.useState<string | null>(null);
    if (q == null) return null;
    const answers = q.answerSelections.split(', ');
    const values = q.answerValues.split(', ');
    const onClick = (e: WithPreventDefault) => {
        e.preventDefault();
        setQuestion1(question1Answer);
    };
    return (
        <>
            <div className="RadioGroup">
                <div className="QuestionText">{q.text}</div>
                {answers?.map((option, idx) => (
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
                                            e.target.value,
                                        );
                                        setQuestion1Answer(
                                            e.target.value,
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