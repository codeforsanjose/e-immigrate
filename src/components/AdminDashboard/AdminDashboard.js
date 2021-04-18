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
                const updatedResponses = responses.map((item) => {
                    const { questionnaireResponse = {} } = item;
                    const newFlag = Object.entries(
                        questionnaireResponse
                    ).reduce((acc, [key, value]) => {
                        return key !== 'male'
                            ? value.toUpperCase() === 'YES'
                                ? 'red'
                                : acc
                            : acc;
                    }, 'green');
                    return {
                        ...item,
                        selected: false,
                        flag: newFlag,
                    };
                });
                setQuestionnaireResponses(updatedResponses);
            });
        }
    }, [props.history]);

    const selectResponseCheckbox = (index) => {
        const updatedResponses = questionnaireResponses.map(
            (item, responseIndex) => {
                return {
                    ...item,
                    selected:
                        responseIndex === index
                            ? !item.selected
                            : item.selected,
                };
            }
        );
        setQuestionnaireResponses(updatedResponses);
    };
    const toggleFlag = (index) => {
        const updatedResponses = questionnaireResponses.map(
            (item, responseIndex) => {
                return {
                    ...item,
                    flag: responseIndex === index ? 'green' : item.flag,
                };
            }
        );
        setQuestionnaireResponses(updatedResponses);
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
            const allAnswers = Object.keys(questionnaireResponse).reduce(
                (accumulator, questionKey, index) => {
                    const flagIt =
                        questionKey !== 'male'
                            ? questionnaireResponse[
                                  questionKey
                              ].toUpperCase() === 'YES'
                                ? 'red-outline'
                                : 'green-outline'
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
                        <div
                            className={`flag ${response.flag}`}
                            onClick={(e) => toggleFlag(index)}
                        ></div>
                    </td>
                    <td>
                        <section>
                            <input
                                type="checkbox"
                                onClick={(e) => selectResponseCheckbox(index)}
                            />
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
        const responsesToEmail = questionnaireResponses.filter(
            (responseSelected) => responseSelected.selected
        );
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
        // display alert of emails sent?
    };
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
