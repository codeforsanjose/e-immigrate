import React from 'react';
import { Question1 } from './Question1';
import { Question2 } from './Question2';
import { Question3 } from './Question3';
import { BindFieldFunction, CollectAnswerFunction } from '../../types/common';
import { QuestionProps, QuestionProps_Q } from './QuestionTypes';
import { ContentText } from '../../types/ContentText';

type Branch1Props = {
    filteredQuestions: Array<QuestionProps_Q>;
    bindField: BindFieldFunction;
    setQuestion2: QuestionProps['setQuestion'];
    setQuestion3: QuestionProps['setQuestion'];
    hasQuestion2: boolean;
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    date: number | Date;
    setDate: (value: number | Date) => void;
    collectAnswer: CollectAnswerFunction;
    content: ContentText;
};
function Branch1(props: Branch1Props) {
    const {
        filteredQuestions, 
        bindField, 
        hasQuestion2, 
        setQuestion2, setQuestion3, 
        showModal, setShowModal, date, 
        setDate, content, collectAnswer,
    } = props;
    if (hasQuestion2) {
        return (
            <Question3
                q={filteredQuestions[2]}
                bindField={bindField}
                setQuestion={setQuestion3}
                showModal={showModal}
                setShowModal={setShowModal}
                date={date}
                setDate={setDate}
                content={content}
                collectAnswer={collectAnswer} />
        );
    } 
    else {
        return (
            <Question2
                q={filteredQuestions[1]}
                bindField={bindField}
                setQuestion={setQuestion2}
                content={content}
                collectAnswer={collectAnswer} />
        );
    }
}

function Branch2(props: Branch1Props) {
    const {
        filteredQuestions,
        bindField,
        setQuestion3,
        showModal,
        setShowModal,
        date,
        setDate,
        content,
        collectAnswer,
    } = props;
    return (
        <Question3
            q={filteredQuestions[2]}
            bindField={bindField}
            setQuestion={setQuestion3}
            showModal={showModal}
            setShowModal={setShowModal}
            date={date}
            setDate={setDate}
            content={content}
            collectAnswer={collectAnswer} />
    );
}

type LogicBranchesProps = {
    filteredQuestions: Array<QuestionProps_Q>;
    bindField: BindFieldFunction;
    content: ContentText;
    collectAnswer: CollectAnswerFunction;
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    date: number | Date;
    setDate: (value: number | Date) => void;

    question1: string | null;
    setQuestion1: QuestionProps['setQuestion'];
    question2: string | null;
    setQuestion2: QuestionProps['setQuestion'];
    question3: string | null;
    setQuestion3: QuestionProps['setQuestion'];
};
export function LogicBranches(props: LogicBranchesProps) {
    const {
        content,
        filteredQuestions,
        bindField,
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
        collectAnswer,
    } = props;
    if (question1 === 'Yes') {
        return (
            <Branch1
                filteredQuestions={filteredQuestions}
                bindField={bindField}
                setQuestion2={setQuestion2}
                setQuestion3={setQuestion3}
                showModal={showModal}
                setShowModal={setShowModal}
                date={date}
                hasQuestion2={question2 != null && question2 !== ''}
                setDate={setDate}
                content={content}
                collectAnswer={collectAnswer} />
        );
    } 
    else if (question1 === 'No') {
        return (
            <Branch2
                filteredQuestions={filteredQuestions}
                bindField={bindField}
                setQuestion2={setQuestion2}
                setQuestion3={setQuestion3}
                hasQuestion2={question2 != null && question2 !== ''}
                showModal={showModal}
                setShowModal={setShowModal}
                date={date}
                setDate={setDate}
                content={content}
                collectAnswer={collectAnswer} />
        );
    } 
    else {
        return (
            <Question1
                q={filteredQuestions[0]}
                bindField={bindField}
                setQuestion={setQuestion1}
                content={content}
                collectAnswer={collectAnswer} />
        );
    }
}
