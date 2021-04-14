import React from 'react';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';

const Branch1 = ({
    filteredQuestions,
    bindField,
    question2,
    setQuestion2,
    setQuestion3,
    showModal,
    setShowModal,
    date,
    setDate,
    content,
    collectAnswer,
}) => {
    if (question2) {
        return (
            <Question3
                q={filteredQuestions[2]}
                bindField={bindField}
                setQuestion3={setQuestion3}
                question2={question2}
                showModal={showModal}
                setShowModal={setShowModal}
                date={date}
                setDate={setDate}
                content={content}
                collectAnswer={collectAnswer}
            />
        );
    } else {
        return (
            <Question2
                q={filteredQuestions[1]}
                bindField={bindField}
                setQuestion2={setQuestion2}
                content={content}
                collectAnswer={collectAnswer}
            />
        );
    }
};

const Branch2 = ({
    filteredQuestions,
    bindField,
    setQuestion3,
    question2,
    showModal,
    setShowModal,
    date,
    setDate,
    content,
    collectAnswer,
}) => {
    return (
        <Question3
            q={filteredQuestions[2]}
            bindField={bindField}
            setQuestion3={setQuestion3}
            question2={question2}
            showModal={showModal}
            setShowModal={setShowModal}
            date={date}
            setDate={setDate}
            content={content}
            collectAnswer={collectAnswer}
        />
    );
};

const LogicBranches = ({
    content,
    filteredQuestions,
    bindField,
    question1,
    setQuestion1,
    question2,
    setQuestion2,
    question3,
    setQuestion3,
    showModal,
    setShowModal,
    date,
    setDate,
    collectAnswer,
}) => {
    if (question1 === 'Yes') {
        return (
            <Branch1
                filteredQuestions={filteredQuestions}
                bindField={bindField}
                question2={question2}
                setQuestion2={setQuestion2}
                setQuestion3={setQuestion3}
                showModal={showModal}
                setShowModal={setShowModal}
                date={date}
                setDate={setDate}
                content={content}
                collectAnswer={collectAnswer}
            />
        );
    } else if (question1 === 'No') {
        return (
            <Branch2
                filteredQuestions={filteredQuestions}
                bindField={bindField}
                setQuestion3={setQuestion3}
                question2={question2}
                showModal={showModal}
                setShowModal={setShowModal}
                date={date}
                setDate={setDate}
                content={content}
                collectAnswer={collectAnswer}
            />
        );
    } else {
        return (
            <Question1
                q={filteredQuestions[0]}
                bindField={bindField}
                setQuestion1={setQuestion1}
                content={content}
                collectAnswer={collectAnswer}
            />
        );
    }
};

export default LogicBranches;
