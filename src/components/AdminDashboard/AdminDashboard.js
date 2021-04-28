import React, { useState, useEffect, useMemo } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import {
    getQuestionnaireResponse,
    emailQuestionnaireResponse,
    generateResponsesExcel,
    getQuestions,
    getResponsesExcel,
    deleteResponsesExcel,
} from '../../sendRequest/apis';
import { getAuthToken } from '../../utilities/auth_utils';
import './AdminDashboard.css';
import { workshopTitle } from '../../data/LanguageOptions';

const AGENCIES = ['ALA', 'CAIR', 'CC', 'CET', 'IRC', 'PARS'];
const AdminDashboard = (props) => {
    const [questionnaireResponses, setQuestionnaireResponses] = useState([]);
    const [questions, setQuestions] = useState();
    const [downloadAllResponses, setDownloadAllResponses] = useState(false);
    const [] = useState();
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

    const selectAgencyForResponse = (e, index) => {
        const updatedResponseWithAgency = questionnaireResponses.map(
            (response, resIndex) => {
                return resIndex === index
                    ? {
                          ...response,
                          agency: e.target.value,
                      }
                    : response;
            }
        );
        setQuestionnaireResponses(updatedResponseWithAgency);
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
                        <section>
                            <input
                                type="checkbox"
                                onClick={(e) => selectResponseCheckbox(index)}
                            />
                        </section>
                    </td>
                    <td>
                        <label htmlFor="agency-select">Assigned To:</label>
                        <select
                            id="agency-select"
                            value={response.agency}
                            onChange={(e) => selectAgencyForResponse(e, index)}
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
                            Response Exported:{' '}
                            {response.responseExported ? 'Yes' : 'No'}
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
        const responsesToEmail = questionnaireResponses
            .filter((responseSelected) => responseSelected.selected)
            .map((response) => {
                return { ...response, selected: undefined };
            });

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

    const getExcelFile = () => {
        const filename = 'ResponsesExcel.xlsx';
        const requestObj = {
            url: `${getResponsesExcel}/${filename}`,
            method: 'GET',
        };
        const jwt = getAuthToken();
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        sendRequest(requestObj, headers).then((response) => {
            console.log('success excel', response);
        });
    };

    const downloadResponsesExcel = (e) => {
        const includedResponses = (downloadAllResponses
            ? questionnaireResponses
            : questionnaireResponses.filter(
                  (responseSelected) => responseSelected.selected
              )
        ).sort((a, b) => {
            const keyA = a.agency;
            const keyB = b.agency;
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        console.log('includedResponses :>> ', includedResponses);
        const requestObj = {
            url: generateResponsesExcel,
            method: 'POST',
            body: JSON.stringify({
                questions: questions,
                responses: includedResponses,
            }),
        };
        const jwt = getAuthToken();
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        sendRequest(requestObj, headers).then((response) => {
            console.log('success', response);
        });
        const updatedQuestionnaireResponses = questionnaireResponses.map(
            (response) => {
                return includedResponses.includes(response)
                    ? {
                          ...response,
                          responseExported: true,
                      }
                    : response;
            }
        );
        setQuestionnaireResponses(updatedQuestionnaireResponses);
        setDownloadAllResponses(false);
        getExcelFile();
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
                <label htmlFor="selectAllCheckbox">Download All</label>
                <input
                    id="selecAllCheckbox"
                    type="checkbox"
                    checked={downloadAllResponses}
                    onClick={() => {
                        setDownloadAllResponses(!downloadAllResponses);
                    }}
                />
            </section>
            <section>
                <h3>Details</h3>
                {responsesTable}
            </section>
        </section>
    );
};

export default AdminDashboard;
