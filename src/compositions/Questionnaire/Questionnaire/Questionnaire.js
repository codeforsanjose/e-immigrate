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
    submitQuestionnaireResponse,
    questionnaireResponse,
    setQuestionnaireResponse,
    content = { step2ProceedButton3: '' },
    collectAnswer,
}) => {
    const onSubmit = (e) => {
        e.preventDefault();
        setAllFieldsTouched();
        submitQuestionnaireResponse(questionnaireResponse);
    };

    return (
        <div className="Questionnaire">
            <Questions
                filteredQuestions={filteredQuestions}
                bindField={bindField}
                questions={questions}
                collectAnswer={collectAnswer}
            />
            <Button
                label={content.step2ProceedButton3}
                type="submit"
                className="FormElement"
                onClick={onSubmit}
            />
        </div>
    );
};

const Questions = ({
    filteredQuestions,
    bindField,
    questions,
    collectAnswer,
}) => (
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
                    collectAnswer={collectAnswer}
                />
            );
        })}
    </>
);

const Questionnaire = ({
    questions,
    submitQuestionnaireResponse,
    questionnaireResponse,
    setQuestionnaireResponse,
    content,
}) => {
    const filteredQuestions = questions.filter(
        (q) => q.category === 'Red Flag' || q.category === 'Basic Info'
    );
    const [bindField, setAllFieldsTouched] = useMarkFieldAsTouched();
    const collectAnswer = (slug, answer) => {
        const answeredQuestion = Object.assign({}, questionnaireResponse);
        answeredQuestion[slug] = answer;
        setQuestionnaireResponse(answeredQuestion);
    };

    return (
        <QuestionnaireForm
            filteredQuestions={filteredQuestions}
            bindField={bindField}
            questions={questions}
            setAllFieldsTouched={setAllFieldsTouched}
            submitQuestionnaireResponse={submitQuestionnaireResponse}
            questionnaireResponse={questionnaireResponse}
            setQuestionnaireResponse={setQuestionnaireResponse}
            content={content}
            collectAnswer={collectAnswer}
        />
    );
};

export default Questionnaire;
