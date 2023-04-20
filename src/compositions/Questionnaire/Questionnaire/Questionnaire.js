import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import { answerSelectionRegexSplit } from '../../../utilities/utilityFunctions';

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

    const history = useHistory();
    const filteredQuestions = questions.filter(
        (q) => q.category === categories[categoryIndex]
    );
    const formElements = {
        checkbox: Checkbox,
        date: Date,
        email: Email,
        phoneNumber: PhoneNumber,
        phonenumber: PhoneNumber,
        radio: Radio,
        radioWithFollowUp: RadioWithFollowUp,
        radiowithfollowup: RadioWithFollowUp,
        dropDown: Select,
        dropdown: Select,
        textArea: TextArea,
        textarea: TextArea,
        input: TextInput,
        zip: Zip,
    };
    const attributes = (q) => {
        const answers = q.answerSelections
            ? q.answerSelections.split(answerSelectionRegexSplit).join(', ')
            : null;
        return {
            q: q,
            bindField: bindField,
            collectAnswer: collectAnswer,
            content: content,
            answers: q.answerSelections
                ? answers.split(answerSelectionRegexSplit)
                : null,
            selectAnswers: q.answerSelections
                ? ['--', ...answers.split(answerSelectionRegexSplit)]
                : null,
            values: q.answerSelections
                ? answers.split(answerSelectionRegexSplit)
                : null,
            showFollowUp: showFollowUp,
            setShowFollowUp: setShowFollowUp,
            setErrors: setErrors,
        };
    };

    const onSubmit = (e) => {
        const { legal_resident_date } = questionnaireResponse;
        if (legal_resident_date && legal_resident_date.valid) {
            submitQuestionnaireResponse(questionnaireResponse);
        } else {
            alert(
                'Invalid Resident Date Please select a valid date of residence at the start of the workshop.'
            );
            history.push('/eligibility');
        }
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
                            const questionType =
                                question.questionType.toLowerCase();
                            const followUpQuestions = filteredQuestions.filter(
                                (q) => q.parentQuestionSlug === question.slug
                            );
                            const FormElement = formElements[questionType];
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
