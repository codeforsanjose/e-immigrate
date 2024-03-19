import React from 'react';
import { useMarkFieldAsTouched } from '../Questionnaire/hooks/useMarkFieldAsTouched';
import { LogicBranches } from './LogicBranches';
import { Modal } from './Modal/Modal';

import './WorkshopScreening.css';
import { CollectAnswerFunction } from '../../types/common';
import { GetQuestionsByLanguageElement } from '../../types/ApiResults';
import { ContentText } from '../../types/ContentText';

type WorkshopScreeningProps = {
    content: ContentText; 
    questions: Array<GetQuestionsByLanguageElement>;
    // questionnaireResponse, 
    // setQuestionnaireResponse, 
    collectAnswer: CollectAnswerFunction;
};
export function WorkshopScreening(props: WorkshopScreeningProps) {
    const {
        collectAnswer,
        content,
        // questionnaireResponse,
        questions,
        // setQuestionnaireResponse,
    } = props;
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

    const {
        bindField,
    } = useMarkFieldAsTouched();
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
                setDate={value => setDate((new Date(value)).toDateString())}
                collectAnswer={collectAnswer} />
            <Modal
                showModal={showModal}
                question2={question2}
                date={Date.parse(date)}
                content={content} />
        </div>
    );
}
