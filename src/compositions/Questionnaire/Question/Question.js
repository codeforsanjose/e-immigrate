import React, { useState } from 'react';
import { ReactComponent as Arrow } from '../../../data/images/Arrow-Down-Right.svg';

import './Question.css';

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

const Question = ({
    question,
    bindField,
    followUpQuestions,
    collectAnswer,
    setErrors,
    content,
    showFollowUp,
    setShowFollowUp,
}) => {
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

    const FormElement = formElements[question.questionType];

    return (
        <>
            <fieldset className="Question">
                <div className="QuestionText">
                    {question.text}
                    {question.required
                        ? ` (${content.required})`
                        : ` (${content.optional})`}
                </div>
                <FormElement attributes={attributes(question)} />
            </fieldset>
            {showFollowUp[question.slug] &&
                followUpQuestions.map((followUpQuestion) => {
                    const FollowUpFormElement =
                        formElements[followUpQuestion.questionType];
                    return (
                        <div className="FollowUp" key={followUpQuestion.slug}>
                            <Arrow height="36px" width="36px" />
                            <fieldset className="Question">
                                <div className="QuestionText">
                                    {followUpQuestion.text}
                                    {followUpQuestion.required
                                        ? ` (${content.required})`
                                        : ` (${content.optional})`}
                                </div>
                                <FollowUpFormElement
                                    attributes={attributes(followUpQuestion)}
                                />
                            </fieldset>
                        </div>
                    );
                })}
        </>
    );
};

export default Question;
