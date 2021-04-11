import React, { useState } from 'react';
import { ReactComponent as Arrow } from '../../../data/images/Arrow-Down-Right.svg';

import './Question.css';

import {
    Date,
    Radio,
    RadioWithFollowUp,
    Checkbox,
    TextInput,
    TextArea,
    DropDown,
    Email,
    PhoneNumber,
    Zip,
} from '../../../components/FormComponents/FormComponents';

const Question = ({
    question = { text: '', required: true },
    bindField,
    followUpQuestions,
    collectAnswer,
    content,
}) => {
    const [showFollowUp, setShowFollowUp] = useState(false);

    const { text, required } = question;

    const getInputType = (q) => {
        switch (q.questionType) {
            case 'date':
                return (
                    <Date
                        slug={q.slug}
                        required={q.required}
                        bindField={bindField}
                        collectAnswer={collectAnswer}
                        content={content}
                    />
                );
            case 'radio':
                if (q.followUpQuestionSlug) {
                    return (
                        <RadioWithFollowUp
                            slug={q.slug}
                            required={q.required}
                            answers={q.answerSelections.split(', ')}
                            bindField={bindField}
                            showFollowUp={showFollowUp}
                            setShowFollowUp={setShowFollowUp}
                            className="RadioGroup"
                            collectAnswer={collectAnswer}
                            content={content}
                        />
                    );
                } else {
                    return (
                        <Radio
                            slug={q.slug}
                            required={q.required}
                            answers={q.answerSelections.split(', ')}
                            bindField={bindField}
                            className="RadioGroup"
                            collectAnswer={collectAnswer}
                            content={content}
                        />
                    );
                }
            case 'checkbox':
                return (
                    <Checkbox
                        slug={q.slug}
                        required={q.required}
                        answers={q.answerSelections.split(', ')}
                        bindField={bindField}
                        collectAnswer={collectAnswer}
                        content={content}
                    />
                );
            case 'input':
                return (
                    <TextInput
                        slug={q.slug}
                        required={q.required}
                        bindField={bindField}
                        collectAnswer={collectAnswer}
                        content={content}
                    />
                );
            case 'textArea':
                return (
                    <TextArea
                        slug={q.slug}
                        required={q.required}
                        bindField={bindField}
                        collectAnswer={collectAnswer}
                        content={content}
                    />
                );
            case 'dropDown':
                return (
                    <DropDown
                        slug={q.slug}
                        required={q.required}
                        answers={q.answerSelections.split(', ')}
                        bindField={bindField}
                        collectAnswer={collectAnswer}
                        content={content}
                    />
                );
            case 'email':
                return (
                    <Email
                        slug={q.slug}
                        required={q.required}
                        bindField={bindField}
                        collectAnswer={collectAnswer}
                        content={content}
                    />
                );
            case 'phoneNumber':
                return (
                    <PhoneNumber
                        slug={q.slug}
                        required={q.required}
                        bindField={bindField}
                        collectAnswer={collectAnswer}
                        content={content}
                    />
                );
            case 'zip':
                return (
                    <Zip
                        slug={q.slug}
                        required={q.required}
                        bindField={bindField}
                        collectAnswer={collectAnswer}
                        content={content}
                    />
                );
            default:
                return (
                    <div>
                        An error has occurred. Please return to the home page.
                    </div>
                );
        }
    };

    return (
        <>
            <fieldset className="Question">
                <div className="QuestionText">
                    {text}
                    {required ? ' (required)' : ' (optional)'}
                </div>
                {getInputType(question)}
            </fieldset>
            {showFollowUp &&
                followUpQuestions.map((followUpQuestion) => {
                    return (
                        <div className="FollowUp" key={followUpQuestion.slug}>
                            <Arrow height="36px" width="36px" />
                            <fieldset className="Question">
                                <div className="QuestionText">
                                    {followUpQuestion.text}
                                    {followUpQuestion.required
                                        ? ' (required)'
                                        : ' (optional)'}
                                </div>
                                {getInputType(followUpQuestion)}
                            </fieldset>
                        </div>
                    );
                })}
        </>
    );
};

export default Question;
