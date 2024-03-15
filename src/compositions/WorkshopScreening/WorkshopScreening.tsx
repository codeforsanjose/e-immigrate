import React, { useState } from 'react';
import { useMarkFieldAsTouched } from '../Questionnaire/hooks/useMarkFieldAsTouched';
import { LogicBranches } from './LogicBranches';
import { Modal } from './Modal/Modal';

import './WorkshopScreening.css';
import { CollectAnswerFunction, QData } from '../../types/common';
import { ModalContent } from './Modal/types';
import { QuestionProps } from './QuestionTypes';

type WorkshopScreeningProps = {
    content: ModalContent & {
        errorMessage: string;
        screeningProceedButton: string;
        screeningHeader: string;
        screeningHeader2: string;
    }; 
    questions: Array<NonNullable<QuestionProps['q']>>;
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

    const [question1, setQuestion1] = useState<string | null>('');
    const [question2, setQuestion2] = useState<string | null>('');
    const [question3, setQuestion3] = useState<string | null>('');
    const [showModal, setShowModal] = useState(false);
    const dateToUse = question1?.toLocaleLowerCase() === 'yes'
        ? screeningDate
        : screeningDateMarried;

    const [date, setDate] = useState(dateToUse);
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
                setDate={setDate}
                collectAnswer={collectAnswer} />
            <Modal
                showModal={showModal}
                question2={question2}
                date={date}
                content={content} />
        </div>
    );
}
