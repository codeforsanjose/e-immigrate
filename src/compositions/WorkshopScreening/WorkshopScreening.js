import React, { useState } from 'react';
import useMarkFieldAsTouched from '../../compositions/Questionnaire/hooks/useMarkFieldAsTouched';
import LogicBranches from './LogicBranches';
import Modal from './Modal/Modal';

import './WorkshopScreening.css';

const WorkshopScreening = ({
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

    const addResponse = (question, response) => {
        questionnaireResponse[question] = response;
    };

    return (
        <div className="WorkshopScreening">
            <h1>Let's make sure that you can participate in this workshop</h1>
            <h2>Answer 2-3 questions and find out if you can participate</h2>
            <LogicBranches
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
            <Modal showModal={showModal} question2={question2} date={date} />
        </div>
    );
};

export default WorkshopScreening;
