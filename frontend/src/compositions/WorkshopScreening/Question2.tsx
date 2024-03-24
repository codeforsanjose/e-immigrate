import React from 'react';
import { Button } from '../../components/Button/Button';
import { QuestionProps } from './QuestionTypes';
import { WithPreventDefault } from "../../types/WithPreventDefault";
import { useContentContext } from '../../contexts/ContentContext';
import { AutoRequiredErrorSpan } from '../../components/RequiredErrorPresenter';
import { useQuestionnaireResponseContent } from '../../contexts/QuestionnaireResponseContext';

export function Question2(props: QuestionProps) {
    const { 
        q, 
        setQuestion: setQuestion2, 
    } = props;
    const { content } = useContentContext();
    const { 
        collectAnswer,
        bindField,
    } = useQuestionnaireResponseContent();
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
                                        setQuestion2Answer(
                                            e.target.value,
                                        );
                                    } } />
                                <span className="RadioControl"></span>
                            </span>
                            <span className="RadioLabel">{option}</span>
                        </label>
                        <AutoRequiredErrorSpan />
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
