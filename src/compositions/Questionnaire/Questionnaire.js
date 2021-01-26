import React, { useState, useMemo } from 'react';
import Button from '../../components/Button/Button';
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
} from '../../components/FormComponents/FormComponents';

import './Questionnaire.css';

function useMarkFieldAsTouched() {
    const [touchedFields, setTouchedFields] = useState({});
    const setFieldAsTouched = (event) => {
        event.persist();
        setTouchedFields((prevState) => ({
            ...prevState,
            [event.target.name]: true,
        }));
    };

    const bindField = (name) => ({
        'data-touched': touchedFields[name],
        onBlur: setFieldAsTouched,
    });

    return [bindField];
}

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

    const Input = () => {
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
            <Input className="QuestionInput" />
            <div className="RequiredError">*This field is required</div>
        </fieldset>
    );
};

const Questionnaire = ({ questions }) => {
    const filteredQuestions = questions.filter(
        (q) => q.category === 'Red Flag'
    );
    const [bindField] = useMarkFieldAsTouched();

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
            {questions.map((question) => {
                return (
                    <Question
                        key={question.id}
                        question={question}
                        className="FormElement"
                        bindField={bindField}
                    />
                );
            })}
            <Button label={'Submit'} type="submit" className="FormElement" />
        </form>
    );
};

export default Questionnaire;
