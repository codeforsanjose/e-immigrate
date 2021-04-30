import React, { useState, useEffect, useMemo } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import {
    getQuestionnaireResponse,
    emailQuestionnaireResponse,
    generateResponsesExcel,
    getQuestions,
    getResponsesExcel,
    deleteResponsesExcel,
    agencyAssignURL,
    downloadStatusQuestionnaireResponse,
} from '../../sendRequest/apis';
import { getAuthToken } from '../../utilities/auth_utils';
import './AdminDashboard.css';
import { workshopTitle } from '../../data/LanguageOptions';

const AGENCIES = ['ALA', 'CAIR', 'CC', 'CET', 'IRC', 'PARS'];
const AdminDashboard = (props) => {
    const [questionnaireResponses, setQuestionnaireResponses] = useState([]);
    const [questions, setQuestions] = useState();
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
                        return key !== 'male' &&
                            key !== 'green_card_through_marriage' &&
                            key !== 'still_married_to_that_citizen'
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
                        questionKey !== 'male' &&
                        questionKey !== 'green_card_through_marriage' &&
                        questionKey !== 'still_married_to_that_citizen'
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
                        <span>
                            Response Downloaded:{' '}
                            {response.responseDownloadedToExcel ? 'Yes' : 'No'}
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

    const getExcelFile = () => {
        window.location.href =
            '/api/generateExcel/getLatest/ResponsesExcel.xlsx';
    };

    const updateDownloadStatus = (e) => {
        const responsesToUpdate = questionnaireResponses.filter(
            (responseSelected) => !responseSelected.responseDownloadedToExcel
        );

        const requestObj = {
            url: downloadStatusQuestionnaireResponse,
            method: 'POST',
            body: JSON.stringify({
                responsesToUpdate: responsesToUpdate,
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

    const downloadResponsesExcel = (e) => {
        const includedResponses = questionnaireResponses.sort((a, b) => {
            if (a.agency < b.agency) return -1;
            if (a.agency > b.agency) return 1;
            return 0;
        });
        const requestObj = {
            url: generateResponsesExcel,
            method: 'POST',
            body: JSON.stringify({
                questions: questions,
                responses: includedResponses,
            }),
        };
        updateDownloadStatus();
        const jwt = getAuthToken();
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        sendRequest(requestObj, headers).then((response) => {
            getExcelFile();
        });
    };

    useEffect(() => {
        const requestObj = {
            url: `${getQuestions}/${workshopTitle}.en`,
        };
        sendRequest(requestObj).then((response) => {
            setQuestions(response.questions);
        });
    }, []);

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
                <button onClick={downloadResponsesExcel}>Download Excel</button>
            </section>
            <section>
                <h3>Details</h3>
                {responsesTable}
            </section>
        </section>
    );
};

export default AdminDashboard;
