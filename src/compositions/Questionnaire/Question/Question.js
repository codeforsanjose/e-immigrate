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
    question = { text: '', required: true },
    bindField,
    followUpQuestions,
    collectAnswer,
    setErrors,
    content,
}) => {
    const [showFollowUp, setShowFollowUp] = useState(false);

    const { text, required } = question;

    const getInputType = (q) => {
        switch (q.questionType) {
            case 'date':
                return (
                    <Date
                        q={q}
                        bindField={bindField}
                        collectAnswer={collectAnswer}
                        content={content}
                    />
                );
            case 'radio':
                if (q.followUpQuestionSlug) {
                    return (
                        <RadioWithFollowUp
                            q={q}
                            answers={q.answerSelections.split(', ')}
                            values={q.answerValues.split(', ')}
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
                            q={q}
                            answers={q.answerSelections.split(', ')}
                            values={q.answerValues.split(', ')}
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
                        q={q}
                        answers={q.answerSelections.split(', ')}
                        values={q.answerValues.split(', ')}
                        bindField={bindField}
                        collectAnswer={collectAnswer}
                        content={content}
                    />
                );
            case 'input':
                return (
                    <TextInput
                        q={q}
                        bindField={bindField}
                        collectAnswer={collectAnswer}
                        content={content}
                    />
                );
            case 'textArea':
                return (
                    <TextArea
                        q={q}
                        bindField={bindField}
                        collectAnswer={collectAnswer}
                        content={content}
                    />
                );
            case 'dropDown':
                return (
                    <Select
                        q={q}
                        answers={['--', ...q.answerSelections.split(', ')]}
                        bindField={bindField}
                        collectAnswer={collectAnswer}
                        content={content}
                        values={q.answerValues.split(', ')}
                    />
                );
            case 'email':
                return (
                    <Email
                        q={q}
                        bindField={bindField}
                        collectAnswer={collectAnswer}
                        content={content}
                    />
                );
            case 'phoneNumber':
                return (
                    <PhoneNumber
                        q={q}
                        bindField={bindField}
                        collectAnswer={collectAnswer}
                        setErrors={setErrors}
                        content={content}
                    />
                );
            case 'zip':
                return (
                    <Zip
                        q={q}
                        bindField={bindField}
                        collectAnswer={collectAnswer}
                        setErrors={setErrors}
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
                    {required
                        ? ` (${content.required})`
                        : ` (${content.optional})`}
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
                                        ? ` (${content.required})`
                                        : ` (${content.optional})`}
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
