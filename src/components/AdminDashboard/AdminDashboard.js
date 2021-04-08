import React, { useState, useEffect, useMemo } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import {
    getQuestionnaireResponse,
    emailQuestionnaireResponse,
} from '../../sendRequest/apis';
import { getAuthToken } from '../../utilities/auth_utils';
import './AdminDashboard.css';

const AdminDashboard = (props) => {
    const [questionnaireResponses, setQuestionnaireResponses] = useState([]);
    const [adminSelectedResponses, setSelectedResponses] = useState([]);
    useEffect(() => {
        const jwt = getAuthToken();
        if (jwt === null) {
            return props.history.push('/login');
        } else {
            const requestObj = {
                url: getQuestionnaireResponse,
            };
            const headers = {
                Authorization: `Bearer ${jwt}`,
            };
            sendRequest(requestObj, headers).then((response) => {
                const { responses = [] } = response;
                setQuestionnaireResponses(responses);
            });
        }
    }, [props.history]);

    const selectResponseCheckbox = (index) => {
        console.log('-----------------------------------');
        console.log('the bloody index passed to be selected ', index);
        console.log('tadminSelectedResponses ', adminSelectedResponses);
        const found = adminSelectedResponses.includes((item) => item === index);
        console.log('IS IT FOUND', found);
        if (found) {
            // found it so remove to uncheck
            const updatedSelection = adminSelectedResponses.filter(
                (res) => res !== index
            );
            console.log('updated selected', updatedSelection);
            setSelectedResponses((prevState) => {
                console.log('sooo this still does it -------->', prevState);
                return updatedSelection;
            });
        } else {
            //no fuond then add to selected responses
            setSelectedResponses((prevState) => {
                console.log('sooo this still does it wat??', prevState);
                return [...prevState, index];
            });
        }
    };
    const overviewMarkup = useMemo(() => {
        return (
            <section className="details-container">
                total Responses: {questionnaireResponses.length}
            </section>
        );
    }, [questionnaireResponses]);

    const responsesMarkup = useMemo(() => {
        return questionnaireResponses.map((response, index) => {
            const { questionnaireResponse = {} } = response;
            const colorFlag = Object.values(questionnaireResponse).find(
                (answer) => answer.toUpperCase() === 'YES'
            )
                ? 'red'
                : 'green';
            const allAnswers = Object.keys(questionnaireResponse).reduce(
                (accumulator, questionKey, index) => {
                    const flagIt =
                        questionnaireResponse[questionKey].toUpperCase() ===
                        'YES'
                            ? 'red-outline'
                            : 'green-outline';
                    const answerMarkup = (
                        <article
                            key={`td-answer-${index}`}
                            className={`answer ${flagIt}`}
                        >
                            <b>{index + 1}.</b>
                            <span>
                                {questionKey}:
                                {questionnaireResponse[questionKey]}
                            </span>
                        </article>
                    );
                    return [...accumulator, answerMarkup];
                },
                []
            );

            return (
                <tr key={response._id}>
                    <td>{index + 1}</td>
                    <td>
                        <div className={`flag ${colorFlag}`}></div>
                    </td>
                    <td>
                        <section>
                            {/* <input
                                type="checkbox"
                                onClick={(e) =>
                                    selectResponseCheckbox(e, index)
                                }
                            /> */}
                            <div
                                className={
                                    adminSelectedResponses.includes(index)
                                        ? `checkbox check`
                                        : 'checkbox'
                                }
                                onClick={(e) => selectResponseCheckbox(index)}
                            ></div>
                        </section>
                    </td>
                    <td>
                        <div className="all-answers">{allAnswers}</div>
                    </td>
                </tr>
            );
        });
    }, [questionnaireResponses]);

    const responsesTable = (
        <table className="responses">
            <tbody>{responsesMarkup}</tbody>
        </table>
    );
    const sendSelectedUsersToAgencies = (e) => {
        console.log(
            'here are the ones we selected by index',
            adminSelectedResponses
        );
        console.log(
            'oh and the questionnaireResponses',
            questionnaireResponses
        );
        const responsesToEmail = adminSelectedResponses.map(
            (responseSelected) => questionnaireResponses[responseSelected]
        );
        console.log('responses selected', responsesToEmail);
        const requestObj = {
            url: emailQuestionnaireResponse,
            method: 'POST',
            body: JSON.stringify({
                responsesToEmail: responsesToEmail,
            }),
        };
        const jwt = getAuthToken();
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        sendRequest(requestObj, headers).then((response) => {
            console.log('wow success response', response);
        });
        // display alert of sent?
    };
    //console.log('selecteedResponses', adminSelectedResponses);
    return (
        <section className="AdminDashboard">
            <article className="overview-container">
                <h3>Overview</h3>
                {overviewMarkup}
            </article>
            <section>
                <button onClick={sendSelectedUsersToAgencies}>
                    Send Email
                </button>
            </section>
            <section>
                <h3>Details</h3>
                {responsesTable}
            </section>
        </section>
    );
};

export default AdminDashboard;
