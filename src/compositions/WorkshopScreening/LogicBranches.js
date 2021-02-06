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
}) => {
    if (question2) {
        console.log('here3');
        return (
            <Question3
                q={filteredQuestions[2]}
                bindField={bindField}
                setQuestion3={setQuestion3}
            />
        );
    } else {
        console.log('here2');
        return (
            <Question2
                q={filteredQuestions[1]}
                bindField={bindField}
                setQuestion2={setQuestion2}
            />
        );
    }
};

const Branch2 = ({ filteredQuestions, bindField, setQuestion3 }) => {
    return (
        <Question3
            q={filteredQuestions[2]}
            bindField={bindField}
            setQuestion3={setQuestion3}
        />
    );
};

const LogicBranches = ({
    filteredQuestions,
    bindField,
    question1,
    setQuestion1,
    question2,
    setQuestion2,
    question3,
    setQuestion3,
}) => {
    if (question1 === 'Yes') {
        return (
            <Branch1
                filteredQuestions={filteredQuestions}
                bindField={bindField}
                question2={question2}
                setQuestion2={setQuestion2}
                setQuestion3={setQuestion3}
            />
        );
    } else if (question1 === 'No') {
        return (
            <Branch2
                filteredQuestions={filteredQuestions}
                bindField={bindField}
                setQuestion3={setQuestion3}
            />
        );
    } else {
        return (
            <Question1
                q={filteredQuestions[0]}
                bindField={bindField}
                setQuestion1={setQuestion1}
            />
        );
    }
};

export default LogicBranches;
