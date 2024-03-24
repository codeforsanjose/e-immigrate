import React from 'react';
import { Question1 } from './Question1';
import { Question2 } from './Question2';
import { Question3 } from './Question3';
import { SetQuestionDelegate } from './QuestionTypes';
import { QuestionInfo } from '../../types/ApiResults';

type Branch1Props = {
    filteredQuestions: Array<QuestionInfo>;
    setQuestion2: SetQuestionDelegate;
    setQuestion3: SetQuestionDelegate;
    hasQuestion2: boolean;
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    date: number | Date;
    setDate: (value: number | Date) => void;
};
function Branch1(props: Branch1Props) {
    const {
        filteredQuestions, 
        hasQuestion2, 
        setQuestion2, setQuestion3, 
        showModal, setShowModal, date, 
        setDate,
    } = props;
    if (hasQuestion2) {
        return (
            <Question3
                q={filteredQuestions[2]}
                setQuestion={setQuestion3}
                showModal={showModal}
                setShowModal={setShowModal}
                date={date}
                setDate={setDate}
            />
        );
    } 
    else {
        return (
            <Question2
                q={filteredQuestions[1]}
                setQuestion={setQuestion2}
            />
        );
    }
}

function Branch2(props: Branch1Props) {
    const {
        filteredQuestions,
        setQuestion3,
        showModal,
        setShowModal,
        date,
        setDate,
    } = props;
    return (
        <Question3
            q={filteredQuestions[2]}
            setQuestion={setQuestion3}
            showModal={showModal}
            setShowModal={setShowModal}
            date={date}
            setDate={setDate}
        />
    );
}

type LogicBranchesProps = {
    filteredQuestions: Array<QuestionInfo>;
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    date: number | Date;
    setDate: (value: number | Date) => void;

    question1: string | null;
    setQuestion1: SetQuestionDelegate;
    question2: string | null;
    setQuestion2: SetQuestionDelegate;
    question3: string | null;
    setQuestion3: SetQuestionDelegate;
};
export function LogicBranches(props: LogicBranchesProps) {
    const {
        filteredQuestions,
        question1,
        setQuestion1,
        question2,
        setQuestion2,
        // question3,
        setQuestion3,
        showModal,
        setShowModal,
        date,
        setDate,
    } = props;
    if (question1 === 'Yes') {
        return (
            <Branch1
                filteredQuestions={filteredQuestions}
                setQuestion2={setQuestion2}
                setQuestion3={setQuestion3}
                showModal={showModal}
                setShowModal={setShowModal}
                date={date}
                hasQuestion2={question2 != null && question2 !== ''}
                setDate={setDate}
            />
        );
    } 
    else if (question1 === 'No') {
        return (
            <Branch2
                filteredQuestions={filteredQuestions}
                setQuestion2={setQuestion2}
                setQuestion3={setQuestion3}
                hasQuestion2={question2 != null && question2 !== ''}
                showModal={showModal}
                setShowModal={setShowModal}
                date={date}
                setDate={setDate}
            />
        );
    } 
    else {
        return (
            <Question1
                q={filteredQuestions[0]}
                setQuestion={setQuestion1}
            />
        );
    }
}
