import React, { useMemo } from 'react';

import './Question.css';

import {
    Date,
    Radio,
    Checkbox,
    TextInput,
    TextArea,
    DropDown,
    Email,
    PhoneNumber,
    Zip,
} from '../../../components/FormComponents/FormComponents';

const Question = ({ question, bindField }) => {
    const {
        id,
        slug,
        text,
        questionType,
        answerSelections,
        followUp,
        required,
    } = question;
    const answers = useMemo(() => {
        if (answerSelections) {
            return answerSelections.split(', ');
        }
    }, [answerSelections]);

    const getInputType = () => {
        switch (questionType) {
            case 'date':
                return (
                    <Date
                        slug={slug}
                        required={required}
                        bindField={bindField}
                    />
                );
            case 'radio':
                return (
                    <Radio
                        slug={slug}
                        required={required}
                        answers={answers}
                        bindField={bindField}
                        className="RadioGroup"
                    />
                );
            case 'checkbox':
                return (
                    <Checkbox
                        slug={slug}
                        required={required}
                        answers={answers}
                        bindField={bindField}
                    />
                );
            case 'input':
                return (
                    <TextInput
                        slug={slug}
                        required={required}
                        bindField={bindField}
                    />
                );
            case 'textArea':
                return (
                    <TextArea
                        slug={slug}
                        required={required}
                        bindField={bindField}
                    />
                );
            case 'dropDown':
                return (
                    <DropDown
                        slug={slug}
                        required={required}
                        answers={answers}
                        bindField={bindField}
                    />
                );
            case 'email':
                return (
                    <Email
                        slug={slug}
                        required={required}
                        bindField={bindField}
                    />
                );
            case 'phoneNumber':
                return (
                    <PhoneNumber
                        slug={slug}
                        required={required}
                        bindField={bindField}
                    />
                );
            case 'zip':
                return (
                    <Zip
                        slug={slug}
                        required={required}
                        bindField={bindField}
                    />
                );
        }
    };

    return (
        <fieldset className="Question">
            <div className="QuestionText">
                {text}
                {required ? ' (required)' : ' (optional)'}
            </div>
            {getInputType()}
            <div className="RequiredError">*This field is required</div>
        </fieldset>
    );
};

export default Question;
