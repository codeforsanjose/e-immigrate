import React, { useState } from 'react';
import Button from '../../../components/Button/Button';
import Question from '../Question/Question';
import useMarkFieldAsTouched from '../hooks/useMarkFieldAsTouched';
import QuestionnaireIntro from '../QuestionnaireIntro/QuestionnaireIntro';

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
    categoryIndex,
    setCategoryIndex,
    categories,
}) => {
    const [errors, setErrors] = useState({});
    const [introPage, setIntroPage] = useState(true);
    const onSubmit = (e) => {
        submitQuestionnaireResponse(questionnaireResponse);
    };

    const nextStep = (e) => {
        e.preventDefault();
        const allRequiredFieldsCompleted = filteredQuestions.every((q) => {
            if (q.required && !questionnaireResponse[q.slug]) {
                if (q.parentQuestionSlug) {
                    if (questionnaireResponse[q.parentQuestionSlug] === 'Yes') {
                        return false;
                    } else {
                        return true;
                    }
                }
                return false;
            } else {
                return true;
            }
        });
        setAllFieldsTouched();
        if (
            allRequiredFieldsCompleted &&
            !Object.values(errors).includes(true)
        ) {
            if (categoryIndex < categories.length - 1) {
                setCategoryIndex((prev) => prev + 1);
            } else {
                return onSubmit();
            }
        } else {
            alert(`Please complete every question ${Object.keys(errors)}`);
        }
    };

    return (
        <div className="Questionnaire">
            {introPage ? (
                <QuestionnaireIntro
                    content={content}
                    setIntroPage={setIntroPage}
                />
            ) : (
                <>
                    <Questions
                        filteredQuestions={filteredQuestions}
                        bindField={bindField}
                        questions={questions}
                        collectAnswer={collectAnswer}
                        setErrors={setErrors}
                        content={content}
                    />
                    <Button
                        label={
                            categoryIndex < categories.length - 1
                                ? content.step2ProceedButton2
                                : content.step2ProceedButton3
                        }
                        type="submit"
                        onClick={nextStep}
                    />
                </>
            )}
        </div>
    );
};

const Questions = ({
    filteredQuestions,
    bindField,
    questions,
    collectAnswer,
    setErrors,
    content,
}) => (
    <>
        {filteredQuestions.map((question) => {
            if (question.parentQuestionSlug) {
                return null;
            }

            return (
                <Question
                    key={question.slug}
                    question={question}
                    bindField={bindField}
                    followUpQuestions={questions.filter(
                        (q) => q.parentQuestionSlug === question.slug
                    )}
                    collectAnswer={collectAnswer}
                    setErrors={setErrors}
                    content={content}
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
    collectAnswer,
}) => {
    const categories = ['Basic Info', 'Waiver Flag', 'Red Flag'];
    const [categoryIndex, setCategoryIndex] = useState(0);
    const filteredQuestions = questions.filter(
        (q) => q.category === categories[categoryIndex]
    );
    const [bindField, setAllFieldsTouched] = useMarkFieldAsTouched();
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
            categoryIndex={categoryIndex}
            setCategoryIndex={setCategoryIndex}
            categories={categories}
        />
    );
};

export default Questionnaire;
