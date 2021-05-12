import React, { useState, useEffect, useMemo } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { format } from 'date-fns';
import {
    getQuestionnaireResponse,
    emailQuestionnaireResponse,
    generateResponsesExcel,
    getQuestions,
    agencyAssignURL,
    assignResponseFlag,
} from '../../sendRequest/apis';
import { getAuthToken } from '../../utilities/auth_utils';
import './AdminDashboard.css';
import { languageOptions, workshopTitle } from '../../data/LanguageOptions';
import Navbar from '../../compositions/Navbar/Navbar';
import Button from '../Button/Button';
import { ReactComponent as Arrow } from '../../data/images/SortArrow.svg';

const DESCRIPTIVE_TIMESTAMP = 'MM/dd/yyyy, h:mm:ss a';
const AGENCIES = ['ALA', 'CAIR', 'CC', 'CET', 'IRC', 'PARS'];
const questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire = [
    'male',
    'still_married_to_that_citizen',
    'receive_public_benefits',
    'live_US_18-26_and_are_26-31',
    'selective_service',
    'green_card_through_marriage',
];
const AdminDashboard = (props) => {
    const [questionnaireResponses, setQuestionnaireResponses] = useState([]);
    const [questions, setQuestions] = useState();
    const content = { buttonHome: 'Home' };
    const [flagOrder, setFlagOrder] = useState(false);
    const [emailOrder, setEmailOrder] = useState(false);
    const [downloadOrder, setDownloadOrder] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
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
                const updatedResponses = responses
                    .map((item) => {
                        const { questionnaireResponse = {} } = item;
                        const newFlag = item.flagOverride
                            ? item.flag
                            : Object.entries(questionnaireResponse).reduce(
                                  (acc, [key, value]) => {
                                      return !questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire.includes(
                                          key
                                      )
                                          ? value.toUpperCase() === 'YES'
                                              ? true
                                              : acc
                                          : acc;
                                  },
                                  false
                              );
                        return {
                            ...item,
                            selected: false,
                            flag: newFlag,
                        };
                    })
                    .sort((itemA, itemB) => {
                        return itemA.agency > itemB.agency ? 1 : -1;
                    });
                setLoading(false);
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
                    flagOverride: true,
                };
            }
        );
        const responseToUpdate = updatedResponses.reduce(
            (accumulator, item, responseIndex) => {
                return responseIndex === index ? item : accumulator;
            },
            {}
        );
        const requestObj = {
            url: assignResponseFlag,
            method: 'POST',
            body: JSON.stringify({
                responsesToUpdate: [responseToUpdate],
            }),
        };
        const jwt = getAuthToken();
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        sendRequest(requestObj, headers).then((response) => {
            setQuestionnaireResponses(updatedResponses);
        });
    };
    const flagOverviewMarkup = useMemo(() => {
        return (
            <div className="flag-dashboard-card">
                <h4>Responses</h4>
                <div>
                    <span>Red:</span>
                    <span className="text-red bold">
                        {
                            questionnaireResponses.filter(
                                (response) => response.flag === true
                            ).length
                        }
                    </span>
                </div>
                <div>
                    Green:{' '}
                    <span className="text-green bold">
                        {
                            questionnaireResponses.filter(
                                (response) => response.flag === false
                            ).length
                        }
                    </span>
                </div>
                <div>
                    Total:{' '}
                    <span className="bold">
                        {questionnaireResponses.length}
                    </span>
                </div>
            </div>
        );
    }, [questionnaireResponses]);

    const agencyOverviewMarkup = useMemo(() => {
        return (
            <div className="agency-dashboard-card">
                <h4>Assigned to</h4>
                <div className="agency-grid">
                    {AGENCIES.map((agency, idx) => {
                        return (
                            <div key={idx} className="agency-row">
                                <div>{agency}</div>
                                <div className="sum text-red bold">
                                    {
                                        questionnaireResponses.filter(
                                            (response) =>
                                                response.agency === agency &&
                                                response.flag === true
                                        ).length
                                    }
                                </div>
                                <div className="sum text-green bold">
                                    {
                                        questionnaireResponses.filter(
                                            (response) =>
                                                response.agency === agency &&
                                                response.flag === false
                                        ).length
                                    }
                                </div>
                                <div className="sum bold">
                                    {
                                        questionnaireResponses.filter(
                                            (response) =>
                                                response.agency === agency
                                        ).length
                                    }
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }, [questionnaireResponses]);

    const firstOption = (
        <option key="agency-initial" value="">
            Please select
        </option>
    );
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
            console.log('wow agency success response', response);
            setQuestionnaireResponses(updatedResponses);
        });
    };

    const sortFlags = () => {
        flagOrder
            ? sortAscending('flag', flagOrder, setFlagOrder)
            : sortDescending('flag', flagOrder, setFlagOrder);
    };
    const sortEmail = () => {
        emailOrder
            ? sortAscendingUndefined('emailSent', emailOrder, setEmailOrder)
            : sortDescendingUndefined('emailSent', emailOrder, setEmailOrder);
    };
    const sortDownload = () => {
        downloadOrder
            ? sortAscendingUndefined(
                  'responseDownloadedToExcel',
                  downloadOrder,
                  setDownloadOrder
              )
            : sortDescendingUndefined(
                  'responseDownloadedToExcel',
                  downloadOrder,
                  setDownloadOrder
              );
    };

    const sortAscending = (property, headerState, setHeaderState) => {
        const sortedResponses = questionnaireResponses.sort((a, b) => {
            if (a[property] < b[property]) return -1;
            if (a[property] > b[property]) return 1;
            return 0;
        });
        setQuestionnaireResponses(sortedResponses);
        setHeaderState(!headerState);
    };
    const sortDescending = (property, headerState, setHeaderState) => {
        const sortedResponses = questionnaireResponses.sort((a, b) => {
            if (a[property] > b[property]) return -1;
            if (a[property] < b[property]) return 1;
            return 0;
        });
        setQuestionnaireResponses(sortedResponses);
        setHeaderState(!headerState);
    };
    const sortAscendingUndefined = (property, headerState, setHeaderState) => {
        const sortedResponses = questionnaireResponses.sort((a, b) => {
            if (a[property] && !b[property]) return -1;
            if (!a[property] && b[property]) return 1;
            return 0;
        });
        setQuestionnaireResponses(sortedResponses);
        setHeaderState(!headerState);
    };
    const sortDescendingUndefined = (property, headerState, setHeaderState) => {
        const sortedResponses = questionnaireResponses.sort((a, b) => {
            if (a[property] && !b[property]) return 1;
            if (!a[property] && b[property]) return -1;
            return 0;
        });
        setQuestionnaireResponses(sortedResponses);
        setHeaderState(!headerState);
    };

    const responsesMarkup = useMemo(() => {
        return questionnaireResponses.map((response, index) => {
            const { questionnaireResponse = {} } = response;
            const fullLangText = languageOptions.find(
                (item) => item.code === questionnaireResponse['languageCode']
            );
            const langDisplay =
                (fullLangText && fullLangText.englishName) ||
                `Unknown  ${questionnaireResponse['languageCode']}`;
            const languageMarkupQuestion = (
                <article key={`td-answer-lang-${index}`} className={`answer `}>
                    <span>
                        Lang:
                        {langDisplay}
                    </span>
                </article>
            );
            const policeMarkupQuestion = (
                <article
                    key={`td-answer-police-${index}`}
                    className={`answer contact-with-police`}
                >
                    <span>
                        contact with police:
                        {questionnaireResponse['contact_with_police']}
                    </span>
                </article>
            );
            const policeExplinationMarkupQuestion = questionnaireResponse[
                'contact_with_police_explanation'
            ] ? (
                <article
                    key={`td-answer-police-exp-${index}`}
                    className={`answer  contact-with-police-explain`}
                >
                    <span>
                        police explination:
                        {
                            questionnaireResponse[
                                'contact_with_police_explanation'
                            ]
                        }
                    </span>
                </article>
            ) : null;
            const alreadyQuestionKeyMarkupedUp = [
                'languageCode',
                'contact_with_police',
                'contact_with_police_explanation',
            ];
            const allAnswers = Object.keys(questionnaireResponse).reduce(
                (accumulator, questionKey, index) => {
                    const flagIt = !questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire.includes(
                        questionKey
                    )
                        ? questionnaireResponse[questionKey].toUpperCase() ===
                          'YES'
                            ? 'red-outline'
                            : 'green-outline'
                        : 'green-outline';
                    const answerMarkup = !alreadyQuestionKeyMarkupedUp.includes(
                        questionKey
                    ) ? (
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
                    ) : null;
                    return answerMarkup
                        ? [...accumulator, answerMarkup]
                        : accumulator;
                },
                []
            );
            const allTheAnswers = [
                languageMarkupQuestion,
                policeMarkupQuestion,
                policeExplinationMarkupQuestion,
                ...allAnswers,
            ];
            return (
                <tr key={response._id}>
                    <td>{index + 1}</td>
                    <td>
                        Created:{' '}
                        {format(
                            new Date(response.createdAt),
                            DESCRIPTIVE_TIMESTAMP
                        )}
                    </td>
                    <td>
                        Updated:{' '}
                        {format(
                            new Date(response.updatedAt),
                            DESCRIPTIVE_TIMESTAMP
                        )}
                    </td>
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
                        <span>{response.emailSent ? 'Yes' : 'No'}</span>
                    </td>
                    <td>
                        <span>
                            {response.responseDownloadedToExcel ? 'Yes' : 'No'}
                        </span>
                    </td>
                    <td>
                        <div className="all-answers">{allTheAnswers}</div>
                    </td>
                </tr>
            );
        });
    }, [questionnaireResponses, flagOrder, emailOrder, downloadOrder]);

    const responsesTable = (
        <table className="responses">
            <tbody>
                <tr className="header-row">
                    <th>#</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>
                        Flag
                        <Arrow
                            className={flagOrder ? 'up' : ''}
                            onClick={sortFlags}
                        />
                    </th>
                    <th>Agency</th>
                    <th>
                        Email Sent
                        <Arrow
                            className={emailOrder ? 'up' : ''}
                            onClick={sortEmail}
                        />
                    </th>
                    <th>
                        Response Downloaded
                        <Arrow
                            className={downloadOrder ? 'up' : ''}
                            onClick={sortDownload}
                        />
                    </th>
                    <th>Responses</th>
                </tr>
                {responsesMarkup}
            </tbody>
        </table>
    );

    const sendEmailsToUsers = (e) => {
        const requestObj = {
            url: emailQuestionnaireResponse,
            method: 'POST',
            body: JSON.stringify({
                responsesToEmail: [],
            }),
        };
        const jwt = getAuthToken();
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        setLoading(true);
        sendRequest(requestObj, headers)
            .then((response) => {
                console.log('emails sent?', response);

                setLoading(false);
                //window.location.reload();
            })
            .catch((errors) => {
                setLoading(false);
                console.log(
                    'send emails to users failed errors is',
                    JSON.stringify(errors)
                );
                window.location.reload();
            });
    };

    const getExcelFile = () => {
        setLoading(false);
        window.location.href =
            '/api/generateExcel/getLatest/ResponsesExcel.xlsx';
    };

    const downloadLatestResponsesExcel = (e) => {
        setLoading(true);
        const includedResponses = questionnaireResponses
            .sort((a, b) => {
                if (a.agency < b.agency) return -1;
                if (a.agency > b.agency) return 1;
                return 0;
            })
            .filter((item) => !item.responseDownloadedToExcel);
        const requestObj = {
            url: generateResponsesExcel,
            method: 'POST',
            body: JSON.stringify({
                questions: questions,
                responses: [],
                downloadAll: false,
            }),
        };
        const jwt = getAuthToken();
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        sendRequest(requestObj, headers)
            .then((response) => {
                getExcelFile();
            })
            .catch((errors) => {
                console.log(
                    'Error writing the exel sheet',
                    JSON.stringify(errors)
                );
                alert(
                    'Error writing the exel sheet please contact administrator.'
                );
            });
    };
    const downloadAllResponsesExcel = (e) => {
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
                responses: [],
                downloadAll: true,
            }),
        };
        const jwt = getAuthToken();
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        sendRequest(requestObj, headers)
            .then((response) => {
                getExcelFile();
            })
            .catch((errors) => {
                console.log(
                    'Error writing the exel sheet',
                    JSON.stringify(errors)
                );
                alert(
                    'Error writing the exel sheet please contact administrator.'
                );
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

    const loadingMarkup = loading ? (
        <div className="loading is-vcentered">Loading...</div>
    ) : null;

    return (
        <section>
            <Navbar content={content} dashboard={true} />
            <section className="AdminDashboard">
                {loadingMarkup}
                <section className="overview-container">
                    <article>
                        <h2 className="dashboard-section-title">Overview</h2>
                        <div className="dashboard-card">
                            {flagOverviewMarkup}
                        </div>
                    </article>
                    <article>
                        <h2 className="dashboard-section-title">By Agency</h2>
                        <div className="dashboard-card">
                            {agencyOverviewMarkup}
                        </div>
                    </article>
                </section>
                <section className="dashboard-buttons-container">
                    <Button label="Send Email" onClick={sendEmailsToUsers} />
                    <Button
                        label="Download Latest Excel"
                        onClick={downloadLatestResponsesExcel}
                    />
                    <Button
                        label="Download All Excel"
                        onClick={downloadAllResponsesExcel}
                    />
                </section>
                <section></section>
                <section>
                    <h2 className="dashboard-section-title">Details</h2>
                    {responsesTable}
                </section>
            </section>
        </section>
    );
};

export default AdminDashboard;
