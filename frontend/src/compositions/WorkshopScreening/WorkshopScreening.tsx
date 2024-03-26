import React from 'react';
import { LogicBranches } from './LogicBranches';
import { Modal } from './Modal/Modal';

import './WorkshopScreening.css';

import { useContentContext } from '../../contexts/ContentContext';
import { useQuestionsContext } from '../../contexts/QuestionsContext';


export function WorkshopScreening() {
    const { questions } = useQuestionsContext();
    const { content } = useContentContext();
    const { screeningDate, screeningDateMarried } = content;

    const [question1, setQuestion1] = React.useState<string | null>('');
    const [question2, setQuestion2] = React.useState<string | null>('');
    const [question3, setQuestion3] = React.useState<string | null>('');
    const [showModal, setShowModal] = React.useState(false);
    const dateToUse = question1?.toLocaleLowerCase() === 'yes'
        ? screeningDate
        : screeningDateMarried;

    const [date, setDate] = React.useState(dateToUse);
    const formattedDate = new Date(date);
    const filteredQuestions = questions.filter(
        (q) => q.category === 'Workshop Eligibility',
    );


    return (
        <div className="WorkshopScreening">
            <h1>{content.screeningHeader}</h1>
            <h2>{content.screeningHeader2}</h2>
            <LogicBranches
                filteredQuestions={filteredQuestions}
                question1={question1}
                setQuestion1={setQuestion1}
                question2={question2}
                setQuestion2={setQuestion2}
                question3={question3}
                setQuestion3={setQuestion3}
                showModal={showModal}
                setShowModal={setShowModal}
                date={formattedDate}
                setDate={value => setDate((new Date(value)).toDateString())}
            />
            <Modal
                showModal={showModal}
                question2={question2}
                date={Date.parse(date)}
            />
        </div>
    );
}
