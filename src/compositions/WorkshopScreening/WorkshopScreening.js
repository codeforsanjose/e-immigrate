import React, { useState } from 'react';
import useMarkFieldAsTouched from '../../compositions/Questionnaire/hooks/useMarkFieldAsTouched';
import LogicBranches from './LogicBranches';
import Modal from './Modal/Modal';

import './WorkshopScreening.css';

const WorkshopScreening = ({
    content,
    questions,
    questionnaireResponse,
    setQuestionnaireResponse,
}) => {
    const [question1, setQuestion1] = useState('');
    const [question2, setQuestion2] = useState('');
    const [question3, setQuestion3] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [date, setDate] = useState();

    const filteredQuestions = questions.filter(
        (q) => q.category === 'Workshop Eligibility'
    );
    const [bindField] = useMarkFieldAsTouched();

    const addResponse = (content, question, response) => {
        questionnaireResponse[question] = response;
    };

    return (
        <div className="WorkshopScreening">
            <h1>{content.screeningHeader}</h1>
            <h2>{content.screeningHeader2}</h2>
            <LogicBranches
                content={content}
                filteredQuestions={filteredQuestions}
                bindField={bindField}
                question1={question1}
                setQuestion1={setQuestion1}
                question2={question2}
                setQuestion2={setQuestion2}
                question3={question3}
                setQuestion3={setQuestion3}
                showModal={showModal}
                setShowModal={setShowModal}
                date={date}
                setDate={setDate}
                addResponse={addResponse}
            />
            <Modal
                showModal={showModal}
                question2={question2}
                date={date}
                content={content}
            />
        </div>
    );
};

export default WorkshopScreening;
