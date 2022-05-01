import React, { useState } from 'react';
import useMarkFieldAsTouched from '../../compositions/Questionnaire/hooks/useMarkFieldAsTouched';
import LogicBranches from './LogicBranches';
import Modal from './Modal/Modal';
import moment from 'moment-timezone';

import './WorkshopScreening.css';

const WorkshopScreening = ({
    content,
    questions,
    questionnaireResponse,
    setQuestionnaireResponse,
    collectAnswer,
}) => {
    const { screeningDate, screeningDateMarried } = content;

    const [question1, setQuestion1] = useState('');
    const [question2, setQuestion2] = useState('');
    const [question3, setQuestion3] = useState('');
    const [showModal, setShowModal] = useState(false);
    const dateToUse =
        question1.toLocaleLowerCase() === 'yes'
            ? screeningDate
            : screeningDateMarried;
    //console.log('dateToUse to use----->', dateToUse);
    const [date, setDate] = useState(dateToUse);
    console.log('date to use----->', date, date.split('-'));
    const formattedDate = new Date(date);
    const filteredQuestions = questions.filter(
        (q) => q.category === 'Workshop Eligibility'
    );

    // console.log('what is question 1', question1);
    // console.log('what is question 2', question2);
    console.log('date to use', formattedDate);
    const [bindField] = useMarkFieldAsTouched();
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
                date={formattedDate}
                setDate={setDate}
                collectAnswer={collectAnswer}
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
