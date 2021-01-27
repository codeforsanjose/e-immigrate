import React from 'react';
import Button from '../../../components/Button/Button';
import Question from '../Question/Question';
import useMarkFieldAsTouched from '../hooks/useMarkFieldAsTouched';

import './Questionnaire.css';

const Questionnaire = ({ questions }) => {
    const filteredQuestions = questions.filter(
        // (q) => q.category === 'Red Flag'
        (q) => q.category === 'Workshop Eligibility'
    );
    const [bindField, setAllFieldsTouched] = useMarkFieldAsTouched();

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
            {filteredQuestions.map((question) => {
                return (
                    <Question
                        key={question.id}
                        question={question}
                        className="FormElement"
                        bindField={bindField}
                    />
                );
            })}
            <Button
                label={'Submit'}
                type="submit"
                className="FormElement"
                onClick={setAllFieldsTouched}
            />
        </form>
    );
};

export default Questionnaire;
