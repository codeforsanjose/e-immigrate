import React from 'react';
import Button from '../../../components/Button/Button';
import Question from '../Question/Question';
import useMarkFieldAsTouched from '../hooks/useMarkFieldAsTouched';

import './Questionnaire.css';

const QuestionnaireForm = ({
    filteredQuestions,
    bindField,
    questions,
    setAllFieldsTouched,
}) => {
    return (
        <form
            className="Questionnaire"
            onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.target);
                const data = Object.fromEntries(formData.entries());
                console.log('form data :>> ', data);
            }}
        >
            <Questions
                filteredQuestions={filteredQuestions}
                bindField={bindField}
                questions={questions}
            />
            <div className="ButtonContainer">
                <Button
                    label={'Submit'}
                    type="submit"
                    className="FormElement"
                    onClick={setAllFieldsTouched}
                />
            </div>
        </form>
    );
};

const Questions = ({ filteredQuestions, bindField, questions }) => (
    <>
        {filteredQuestions.map((question) => {
            if (question.parentQuestionSlug) {
                return null;
            }

            return (
                <Question
                    key={question.id}
                    question={question}
                    className="FormElement"
                    bindField={bindField}
                    followUpQuestions={questions.filter(
                        (q) => q.parentQuestionSlug === question.slug
                    )}
                />
            );
        })}
    </>
);

const Questionnaire = ({ questions }) => {
    const filteredQuestions = questions.filter(
        (q) => q.category === 'Red Flag'
    );
    const [bindField, setAllFieldsTouched] = useMarkFieldAsTouched();

    return (
        <QuestionnaireForm
            filteredQuestions={filteredQuestions}
            bindField={bindField}
            questions={questions}
            setAllFieldsTouched={setAllFieldsTouched}
        />
    );
};

export default Questionnaire;
