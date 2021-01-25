import React, { useMemo } from 'react';

import './Questionnaire.css';

const Question = ({ question }) => {
    const {
        id,
        category,
        text,
        questionType,
        answerSelections,
        followUp,
        required,
    } = question;
    const answers = useMemo(() => {
        if (answerSelections) {
            return answerSelections.split(',');
        }
    }, [answerSelections]);

    const Input = () => {
        switch (questionType) {
            case 'date':
                return <input type="date" />;
            case 'radio':
                return (
                    <div>
                        {answers &&
                            answers.map((option) => (
                                <div key={option}>
                                    <input
                                        type="radio"
                                        id={option}
                                        name={`radio${id}`}
                                        // value={option}
                                    />
                                    <label htmlFor={option}>{option}</label>
                                </div>
                            ))}
                    </div>
                );
            case 'checkbox':
                return (
                    <div>
                        {answers &&
                            answers.map((option) => (
                                <div key={option}>
                                    <input
                                        type="checkbox"
                                        id={option}
                                        name={option}
                                        value={option}
                                    />
                                    <label for={option}>{option}</label>
                                </div>
                            ))}
                    </div>
                );
            case 'input':
                return <input type="text" />;
            case 'textArea':
                return <textarea rows="4" cols="50" />;
            case 'dropDown':
                return (
                    <select>
                        {answers &&
                            answers.map((option) => {
                                return <option key={option}>{option}</option>;
                            })}
                    </select>
                );
            case 'email':
                return <input type="email" id="email" name="email" />;
            case 'phoneNumber':
                return (
                    <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
                );
            case 'zip':
                return (
                    <input type="text" id="zip" name="zip" pattern="[0-9]*" />
                );
        }
    };

    return (
        <div className="Question">
            <div className="QuestionText">
                {text}
                {required ? ' (required)' : ' (optional)'}
            </div>
            <Input className="QuestionInput" />
        </div>
    );
};

const Questionnaire = ({ questions }) => {
    return (
        <div className="Questionnaire">
            {questions.map((question) => {
                return <Question key={question.id} question={question} />;
            })}
        </div>
    );
};

export default Questionnaire;
