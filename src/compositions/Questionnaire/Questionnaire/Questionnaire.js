import React, { useState } from 'react';
import Button from '../../../components/Button/Button';
import Question from '../Question/Question';
import useMarkFieldAsTouched from '../hooks/useMarkFieldAsTouched';
import QuestionnaireIntro from '../QuestionnaireIntro/QuestionnaireIntro';

import './Questionnaire.css';

const Questions = ({
    filteredQuestions,
    bindField,
    questions,
    collectAnswer,
    setErrors,
    content,
    showFollowUp,
    setShowFollowUp,
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
                    showFollowUp={showFollowUp}
                    setShowFollowUp={setShowFollowUp}
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
    const [errors, setErrors] = useState({});
    const [introPage, setIntroPage] = useState(true);
    const [showFollowUp, setShowFollowUp] = useState({});
    const onSubmit = (e) => {
        submitQuestionnaireResponse(questionnaireResponse);
    };

    const nextStep = (e) => {
        e.preventDefault();
        const allRequiredFieldsCompleted = filteredQuestions.every((q) => {
            if (q.required && !questionnaireResponse[q.slug]) {
                if (q.parentQuestionSlug) {
                    if (questionnaireResponse[q.parentQuestionSlug] === 'Yes') {
                        return true; //should be false
                    } else {
                        return true;
                    }
                }
                return true; //should be false
            } else {
                return true;
            }
        });
        setAllFieldsTouched();
        if (allRequiredFieldsCompleted) {
            if (categoryIndex < categories.length - 1) {
                setCategoryIndex((prev) => prev + 1);
            } else {
                return onSubmit();
            }
        } else {
            alert(`Please complete every question`);
        }
    };
    console.log('showFollowUp :>> ', showFollowUp);
    return (
        <div className="Questionnaire">
            {introPage ? (
                <QuestionnaireIntro
                    content={content}
                    setIntroPage={setIntroPage}
                />
            ) : (
                <>
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
                                        (q) =>
                                            q.parentQuestionSlug ===
                                            question.slug
                                    )}
                                    collectAnswer={collectAnswer}
                                    setErrors={setErrors}
                                    content={content}
                                    showFollowUp={showFollowUp}
                                    setShowFollowUp={setShowFollowUp}
                                />
                            );
                        })}
                    </>
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

export default Questionnaire;
