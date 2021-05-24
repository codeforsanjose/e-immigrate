import React, { useState } from 'react';
import Button from '../../../components/Button/Button';
import useMarkFieldAsTouched from '../hooks/useMarkFieldAsTouched';
import QuestionnaireIntro from '../QuestionnaireIntro/QuestionnaireIntro';
import { ReactComponent as Arrow } from '../../../data/images/Arrow-Down-Right.svg';
import Checkbox from '../../../components/Checkbox/Checkbox';
import Date from '../../../components/Date/Date';
import Email from '../../../components/Email/Email';
import PhoneNumber from '../../../components/PhoneNumber/PhoneNumber';
import Radio from '../../../components/Radio/Radio';
import RadioWithFollowUp from '../../../components/RadioWithFollowUp/RadioWithFollowUp';
import Select from '../../../components/Select/Select';
import TextArea from '../../../components/TextArea/TextArea';
import TextInput from '../../../components/TextInput/TextInput';
import Zip from '../../../components/Zip/Zip';

import './Questionnaire.css';

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
    const [bindField, setAllFieldsTouched] = useMarkFieldAsTouched();
    const [errors, setErrors] = useState({});
    const [introPage, setIntroPage] = useState(true);
    const [showFollowUp, setShowFollowUp] = useState({});

    const filteredQuestions = questions.filter(
        (q) => q.category === categories[categoryIndex]
    );
    const formElements = {
        checkbox: Checkbox,
        date: Date,
        email: Email,
        phoneNumber: PhoneNumber,
        radio: Radio,
        radioWithFollowUp: RadioWithFollowUp,
        dropDown: Select,
        textArea: TextArea,
        input: TextInput,
        zip: Zip,
    };
    const attributes = (q) => {
        return {
            q: q,
            bindField: bindField,
            collectAnswer: collectAnswer,
            content: content,
            answers: q.answerSelections ? q.answerSelections.split(', ') : null,
            selectAnswers: q.answerSelections
                ? ['--', ...q.answerSelections.split(', ')]
                : null,
            values: q.answerSelections ? q.answerValues.split(', ') : null,
            showFollowUp: showFollowUp,
            setShowFollowUp: setShowFollowUp,
            setErrors: setErrors,
        };
    };

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
                            const followUpQuestions = filteredQuestions.filter(
                                (q) => q.parentQuestionSlug === question.slug
                            );
                            const FormElement =
                                formElements[question.questionType];
                            if (question.parentQuestionSlug) {
                                return null;
                            }
                            return (
                                <div key={question.slug}>
                                    <fieldset className="Question">
                                        <div className="QuestionText">
                                            {question.text}
                                            {question.required
                                                ? ` (${content.required})`
                                                : ` (${content.optional})`}
                                        </div>
                                        <FormElement
                                            attributes={attributes(question)}
                                        />
                                    </fieldset>
                                    {showFollowUp[question.slug] &&
                                        followUpQuestions.map(
                                            (followUpQuestion) => {
                                                const FollowUpFormElement =
                                                    formElements[
                                                        followUpQuestion
                                                            .questionType
                                                    ];
                                                return (
                                                    <div
                                                        className="FollowUp"
                                                        key={
                                                            followUpQuestion.slug
                                                        }
                                                    >
                                                        <Arrow
                                                            height="36px"
                                                            width="36px"
                                                        />
                                                        <fieldset className="Question">
                                                            <div className="QuestionText">
                                                                {
                                                                    followUpQuestion.text
                                                                }
                                                                {followUpQuestion.required
                                                                    ? ` (${content.required})`
                                                                    : ` (${content.optional})`}
                                                            </div>
                                                            <FollowUpFormElement
                                                                attributes={attributes(
                                                                    followUpQuestion
                                                                )}
                                                            />
                                                        </fieldset>
                                                    </div>
                                                );
                                            }
                                        )}
                                </div>
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
