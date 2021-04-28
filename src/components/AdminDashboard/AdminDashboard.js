import React, { useState, useEffect, useMemo } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import {
    getQuestionnaireResponse,
    emailQuestionnaireResponse,
    agencyAssignURL,
} from '../../sendRequest/apis';
import { getAuthToken } from '../../utilities/auth_utils';
import './AdminDashboard.css';

const AGENCIES = ['ALA', 'CAIR', 'CC', 'CET', 'IRC', 'PARS'];
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
                                ? true
                                : acc
                            : acc;
                    }, false);
                    return {
                        ...item,
                        selected: false,
                        flag: newFlag,
                    };
                });
                updatedResponses.sort((itemA, itemB) => {
                    return itemA.agency > itemB.agency ? 1 : -1;
                });
                setQuestionnaireResponses(updatedResponses);
            });
        }
    }, [props.history]);

    const toggleFlag = (index) => {
        const updatedResponses = questionnaireResponses.map(
            (item, responseIndex) => {
                return {
                    ...item,
                    flag: responseIndex === index ? !item.flag : item.flag,
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

    const firstOption = <option value="">Please select</option>;
    const agenciesOptions = AGENCIES.map((agency, index) => {
        return (
            <option key={`agency-${index}`} value={agency}>
                {agency}
            </option>
        );
    });
    const allOptions = [firstOption, agenciesOptions];

    const assignResponseAgency = (e, resIndex) => {
        const updatedResponses = questionnaireResponses.map((item, index) => {
            return resIndex === index
                ? {
                      ...item,
                      agency: e.target.value,
                  }
                : item;
        });
        const selectedResponseForAgency = {
            ...questionnaireResponses[resIndex],
            agency: e.target.value,
        };
        const requestObj = {
            url: agencyAssignURL,
            method: 'POST',
            body: JSON.stringify({
                responsesToEmail: [selectedResponseForAgency],
            }),
        };
        const jwt = getAuthToken();
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        sendRequest(requestObj, headers).then((response) => {
            console.log('wow success response', response);
            setQuestionnaireResponses(updatedResponses);
        });
    };
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
                            className={`flag ${
                                response.flag ? 'red' : 'green'
                            }`}
                            onClick={(e) => toggleFlag(index)}
                        ></div>
                    </td>
                    <td>
                        <label htmlFor="agency-select">Assigned To:</label>
                        <select
                            id="agency-select"
                            value={response.agency}
                            onChange={(e) => assignResponseAgency(e, index)}
                        >
                            {allOptions}
                        </select>
                    </td>
                    <td>
                        <span>
                            Email Sent: {response.emailSent ? 'Yes' : 'No'}
                        </span>
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
            (responseSelected) => !responseSelected.emailSent
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
            window.location.reload();
        });
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
