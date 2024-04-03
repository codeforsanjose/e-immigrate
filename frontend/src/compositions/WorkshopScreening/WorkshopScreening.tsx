import React from 'react';
import { LogicBranches } from './LogicBranches';
import { Modal } from './Modal/Modal';

import './WorkshopScreening.css';

import { useContentContext } from '../../contexts/ContentContext';
import { useQuestionsContext } from '../../contexts/QuestionsContext';
import { Question1 } from './Question1';
import { compareDateForValidation } from '../../utilities/dateHelper';
import { Navigate } from 'react-router-dom';


export function WorkshopScreening() {
    const { questions } = useQuestionsContext();
    const { content } = useContentContext();
    const { screeningDate, screeningDateMarried } = content;

    const [question1, setQuestion1] = React.useState<string | null>('');
    const [question2, setQuestion2] = React.useState<string | null>('');
    const [question3, setQuestion3] = React.useState<string | null>('');
    const [question4, setQuestion4] = React.useState<string | null>('');
    const [question5, setQuestion5] = React.useState<string | null>('');
    const [question6, setQuestion6] = React.useState<string | null>('');

    const [showLogicBranch, setShowLogicBranch] = React.useState<boolean>(true);
    const [showModal, setShowModal] = React.useState(false);
    const handleShowRestOfQuestions = () => {
        setShowLogicBranch(currentState => {
            return false;
        });
    };
    const dateToUse = question1?.toLocaleLowerCase() === 'yes'
        ? screeningDate
        : screeningDateMarried;

    const [date, setDate] = React.useState(dateToUse);
    const formattedDate = new Date(date);
    const filteredQuestions = questions.filter(
        (q) => q.category === 'Workshop Eligibility',
    );


    const restOfScreeningQuestions = filteredQuestions.slice(3);
    const finalScreenStep = (
        <div>
            <Navigate to={'/overview'} />;
        </div>
    );
    return (
        <div className="WorkshopScreening">
            <h1>{content.screeningHeader}</h1>
            <h2>{content.screeningHeader2}</h2>
            {showLogicBranch && <LogicBranches
                filteredQuestions={filteredQuestions}
                question1={question1}
                setQuestion1={setQuestion1}
                question2={question2}
                setQuestion2={setQuestion2}
                question3={question3}
                setQuestion3={setQuestion3}
                showModal={showModal}
                setShowModal={handleShowRestOfQuestions}
                date={formattedDate}
                setDate={value => {
                    const check = compareDateForValidation(value, dateToUse); // date must be before the dateToUse
                    if (check) {
                        // valid date
                        setDate((new Date(value)).toDateString());
                    }
                    else {
                        // invalid date selected show the modal to leave
                        setShowModal(true);
                    }

                }}
            />}


            {!showLogicBranch && question4 === ''
                ? (<Question1
                    q={restOfScreeningQuestions[0]}
                    setQuestion={(userResponse) => {
                        setQuestion4(currentState => {
                            return userResponse;
                        });
                    }}
                />
                )
                : null}
            {!showLogicBranch && question4 !== '' && question5 === ''
                ? (<Question1
                    q={restOfScreeningQuestions[1]}
                    setQuestion={(userResponse) => {
                        setQuestion5(currentState => {
                            return userResponse;
                        });
                    }}
                />
                )
                : null}
            {!showLogicBranch && question5 !== '' && question6 === ''
                ? (<Question1
                    q={restOfScreeningQuestions[2]}
                    setQuestion={(userResponse) => {
                        setQuestion6(currentState => {
                            return userResponse;
                        });
                    }}
                />
                )
                : null}

            <Modal
                showModal={showModal}
                question2={question2}
                date={Date.parse(date)}
            />
            {
                question6 !== '' && question5 !== '' && !showModal ? finalScreenStep : null
            }
        </div>
    );
}
