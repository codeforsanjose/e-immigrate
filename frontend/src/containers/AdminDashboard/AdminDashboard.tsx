import React from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { History } from 'history';
import { format } from 'date-fns';
import { apis } from '../../sendRequest/apis';
import { getAuthToken } from '../../utilities/auth_utils';
import { searchArrayObjects } from '../../utilities/search_array';
import './AdminDashboard.css';
import { languageOptions, workshopTitle } from '../../data/LanguageOptions';
import { Navbar } from '../../compositions/Navbar/Navbar';
import { Button } from '../../components/Button/Button';
import SortArrow from '../../data/images/SortArrow.svg';
import { WithEventTarget } from '../../types/WithEventTarget';
import { defaultCompare } from '../../utilities/defaultCompare';
import { useHistory } from 'react-router-dom';
const {
    getQuestionnaireResponse,
    emailQuestionnaireResponse,
    generateResponsesExcel,
    getQuestions,
    agencyAssignURL,
    assignResponseFlag,
    assignEmail,
    deleteQuestionnaireResponse,
} = apis;
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

function isAgencyObject(value: unknown): value is { agency: string, } {
    if (value == null) return false;
    else if (typeof value !== 'object') return false;
    if (!('agency' in value)) return false;
    return typeof (value.agency) === 'number';
}
type QuestionnaireResponseElement = {
    _id: string;
    responseDownloadedToExcel: boolean;
    questionnaireResponse: Record<string, string>;
    flagOverride?: boolean;
    flag?: boolean;
    agency: string;
    emailSent?: boolean;
    createdAt: number | Date;
    updatedAt: number | Date;
};
export function AdminDashboard() {
    const history = useHistory();
    const [questionnaireResponses, setQuestionnaireResponses] = React.useState<Array<QuestionnaireResponseElement>>([]);
    const [questions, setQuestions] = React.useState<Array<string>>([]);
    const content = { buttonHome: 'Home' };
    const [language, setLanguage] = React.useState<string>('');
    const [flagOrder, setFlagOrder] = React.useState(false);
    const [emailOrder, setEmailOrder] = React.useState(false);
    const [downloadOrder, setDownloadOrder] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [createdOrder, setCreatedOrder] = React.useState(true);
    const [updatedOrder, setUpdatedOrder] = React.useState(true);
    const [filterBy, setFilterBy] = React.useState('full_name');
    const [searchTerm, setSearchTerm] = React.useState('');
    React.useEffect(() => {
        setLoading(true);
        const jwt = getAuthToken();
        if (jwt === null) {
            history.push('/login');
            return;
        }
        else {
            const requestObj = {
                url: getQuestionnaireResponse,
            };
            const headers = {
                Authorization: `Bearer ${jwt}`,
            };
            sendRequest<{
                responses: Array<QuestionnaireResponseElement>;
            }>(requestObj, headers).then((response) => {
                const { responses = [] } = response;
                const updatedResponses = responses
                    .map((item) => {
                        const { questionnaireResponse = {} } = item;
                        const newFlag = (item.flagOverride ?? false)
                            ? item.flag
                            : Object.entries(questionnaireResponse).reduce(
                                (acc, stuff) => {
                                    const [key, value] = stuff;
                                    return !questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire.includes(
                                        key,
                                    )
                                        ? (value.length > 0) &&
                                            value.toUpperCase() === 'YES'
                                            ? true
                                            : acc
                                        : acc;
                                },
                                false,
                            );
                        return {
                            ...item,
                            selected: false,
                            flag: newFlag,
                        };
                    })
                    .sort((itemA, itemB) => {
                        if (isAgencyObject(itemA) && isAgencyObject(itemB)) {
                            return itemA.agency > itemB.agency ? 1 : -1;
                        }
                        return -1;
                    });
                setLoading(false);
                setQuestionnaireResponses(updatedResponses);
            });
        }
    }, [history]);

    const toggleFlag = React.useCallback((index: number) => {
        const updatedResponses = questionnaireResponses.map(
            (item, responseIndex) => {
                return {
                    ...item,
                    flag: responseIndex === index ? !(item.flag ?? false) : item.flag,
                    flagOverride: true,
                };
            },
        );
        const responseToUpdate = updatedResponses.reduce(
            (accumulator, item, responseIndex) => {
                return responseIndex === index ? item : accumulator;
            },
            {},
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
    }, [questionnaireResponses]);
    const resetEmail = React.useCallback((index: number) => {
        const updatedResponses = questionnaireResponses.map(
            (item, responseIndex) => {
                return {
                    ...item,
                    emailSent: responseIndex === index ? false : item.emailSent,
                };
            },
        );
        const responseToUpdate = updatedResponses.reduce(
            (accumulator, item, responseIndex) => {
                return responseIndex === index ? item : accumulator;
            },
            {},
        );
        const requestObj = {
            url: assignEmail,
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
    }, [questionnaireResponses]);
    const flagOverviewMarkup = React.useMemo(() => {
        return (
            <div className="flag-dashboard-card">
                <h4>Responses</h4>
                <div>
                    <span>Red:</span>
                    <span className="text-red bold">
                        {questionnaireResponses.filter(
                            (response) => response.flag === true,
                        ).length}
                    </span>
                </div>
                <div>
                    Green:{' '}
                    <span className="text-green bold">
                        {questionnaireResponses.filter(
                            (response) => response.flag === false,
                        ).length}
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

    const agencyOverviewMarkup = React.useMemo(() => {
        return (
            <div className="agency-dashboard-card">
                <h4>Assigned to</h4>
                <div className="agency-grid">
                    {AGENCIES.map((agency, idx) => {
                        return (
                            <div key={idx} className="agency-row">
                                <div>{agency}</div>
                                <div className="sum text-red bold">
                                    {questionnaireResponses.filter(
                                        (response) => response.agency === agency &&
                                            response.flag === true,
                                    ).length}
                                </div>
                                <div className="sum text-green bold">
                                    {questionnaireResponses.filter(
                                        (response) => response.agency === agency &&
                                            response.flag === false,
                                    ).length}
                                </div>
                                <div className="sum bold">
                                    {questionnaireResponses.filter(
                                        (response) => response.agency === agency,
                                    ).length}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }, [questionnaireResponses]);

    const allOptions = React.useMemo(() => {
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
        return [firstOption, agenciesOptions];
    }, []);

    const assignResponseAgency = React.useCallback((e: WithEventTarget<string>, resIndex: number) => {
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
    }, [questionnaireResponses]);

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
                setDownloadOrder,
            )
            : sortDescendingUndefined(
                'responseDownloadedToExcel',
                downloadOrder,
                setDownloadOrder,
            );
    };
    const sortCreated = () => {
        createdOrder
            ? sortAscending('createdAt', createdOrder, setCreatedOrder)
            : sortDescending('createdAt', createdOrder, setCreatedOrder);
    };
    const sortUpdated = () => {
        updatedOrder
            ? sortAscending('updatedAt', updatedOrder, setUpdatedOrder)
            : sortDescending('updatedAt', updatedOrder, setUpdatedOrder);
    };
    
    type HeaderState = boolean;
    type SetHeaderState = (value: HeaderState) => void;
    type SortFunction = (property: keyof QuestionnaireResponseElement, headerState: HeaderState, setHeaderState: SetHeaderState) => void;
    const sortAscending: SortFunction = (property, headerState, setHeaderState) => {
        const sortedResponses = questionnaireResponses.sort((a, b) => {
            return defaultCompare(a[property], b[property]);
        });
        setQuestionnaireResponses(sortedResponses);
        setHeaderState(!headerState);
    };
    const sortDescending: SortFunction = (property, headerState, setHeaderState) => {
        const sortedResponses = questionnaireResponses.sort((a, b) => {
            return -defaultCompare(a[property], b[property]);
        });
        setQuestionnaireResponses(sortedResponses);
        setHeaderState(!headerState);
    };
    const sortAscendingUndefined: SortFunction = (property, headerState, setHeaderState) => {
        const sortedResponses = questionnaireResponses.sort((a, b) => {
            if ((Boolean(a[property])) && !(Boolean(b[property]))) return -1;
            if (!(Boolean(a[property])) && (Boolean(b[property]))) return 1;
            return 0;
        });
        setQuestionnaireResponses(sortedResponses);
        setHeaderState(!headerState);
    };
    const sortDescendingUndefined: SortFunction = (property, headerState, setHeaderState) => {
        const sortedResponses = questionnaireResponses.sort((a, b) => {
            if ((Boolean(a[property])) && !(Boolean(b[property]))) return 1;
            if (!(Boolean(a[property])) && (Boolean(b[property]))) return -1;
            return 0;
        });
        setQuestionnaireResponses(sortedResponses);
        setHeaderState(!headerState);
    };
    const softDeleteResponse = React.useCallback((resIndex: number) => {
        const confirmBox = window.confirm(
            'Do you really want to delete this questionnaire response?',
        );
        if (!confirmBox) {
            return;
        }

        const response_id = questionnaireResponses[resIndex]._id;
        const updatedResponses = questionnaireResponses.filter(
            (item, index) => resIndex !== index,
        );

        const requestObj = {
            url: deleteQuestionnaireResponse.replace(':id', response_id),
            method: 'PUT',
        };
        const jwt = getAuthToken();
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        sendRequest(requestObj, headers)
            .then((response) => {
                setQuestionnaireResponses(updatedResponses);
            })
            .catch((err) => {
                console.log(
                    `error soft-deleting questionnaire response ${response_id}`,
                    err,
                );
            });
    }, [questionnaireResponses]);

    const responsesMarkup = React.useMemo(() => {
        const filterQuestionnaireResponses = searchArrayObjects(
            questionnaireResponses,
            `questionnaireResponse.${filterBy}`,
            searchTerm,
            3,
        );
        return filterQuestionnaireResponses.map((response, index) => {
            const { questionnaireResponse = {} } = response;
            const fullLangText = languageOptions.find(
                (item) => item.code === questionnaireResponse.languageCode,
            );
            const langDisplay = (fullLangText?.englishName) ?? `Unknown  ${questionnaireResponse.languageCode}`;
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
                        {questionnaireResponse.contact_with_police}
                    </span>
                </article>
            );
            const policeExplinationMarkupQuestion = (questionnaireResponse.contact_with_police_explanation.length > 0)
                ? (
                    <article
                        key={`td-answer-police-exp-${index}`}
                        className={`answer  contact-with-police-explain`}
                    >
                        <span>
                        police explination:
                            {questionnaireResponse.contact_with_police_explanation}
                        </span>
                    </article>
                )
                : null;
            const alreadyQuestionKeyMarkupedUp = [
                'languageCode',
                'contact_with_police',
                'contact_with_police_explanation',
            ];
            const allAnswers = Object.keys(questionnaireResponse).reduce<Array<JSX.Element>>((accumulator, questionKey, index) => {
                const flagIt = !questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire.includes(
                    questionKey,
                )
                    ? (questionnaireResponse[questionKey].length > 0) &&
                            questionnaireResponse[questionKey].toUpperCase() ===
                            'YES'
                        ? 'red-outline'
                        : 'green-outline'
                    : 'green-outline';
                const answerMarkup = !alreadyQuestionKeyMarkupedUp.includes(
                    questionKey,
                )
                    ? (
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
                    )
                    : null;
                return (answerMarkup != null)
                    ? [...accumulator, answerMarkup]
                    : accumulator;
            }, []);
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
                            DESCRIPTIVE_TIMESTAMP,
                        )}
                    </td>
                    <td>
                        Updated:{' '}
                        {format(
                            new Date(response.updatedAt),
                            DESCRIPTIVE_TIMESTAMP,
                        )}
                    </td>
                    <td>
                        <div
                            className={`flag ${(response.flag ?? false) ? 'red' : 'green'}`}
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
                        <span>{(response.emailSent ?? false) ? 'Yes' : 'No'}</span>
                        <button onClick={(e) => resetEmail(index)}>
                            RESET
                        </button>
                    </td>
                    <td>
                        <span>
                            {response.responseDownloadedToExcel ? 'Yes' : 'No'}
                        </span>
                    </td>
                    <td>
                        <div
                            title="Delete this response"
                            className="delete"
                            onClick={(e) => softDeleteResponse(index)}
                        ></div>
                    </td>
                    <td>
                        <div className="all-answers">{allTheAnswers}</div>
                    </td>
                </tr>
            );
        });
    }, [questionnaireResponses, filterBy, searchTerm, allOptions, toggleFlag, assignResponseAgency, resetEmail, softDeleteResponse]);

    const responsesTable = (
        <table className="responses">
            <tbody>
                <tr className="header-row">
                    <th>#</th>
                    <th>
                        Created
                        <SortArrow
                            className={createdOrder ? '' : 'up'}
                            onClick={sortCreated} />
                    </th>
                    <th>
                        Updated
                        <SortArrow
                            className={updatedOrder ? '' : 'up'}
                            onClick={sortUpdated} />
                    </th>
                    <th>
                        Flag
                        <SortArrow
                            className={flagOrder ? 'up' : ''}
                            onClick={sortFlags} />
                    </th>
                    <th>Agency</th>
                    <th>
                        Email Sent
                        <SortArrow
                            className={emailOrder ? 'up' : ''}
                            onClick={sortEmail} />
                    </th>
                    <th>
                        Response Downloaded
                        <SortArrow
                            className={downloadOrder ? 'up' : ''}
                            onClick={sortDownload} />
                    </th>
                    <th></th>
                    <th>Responses</th>
                </tr>
                {responsesMarkup}
            </tbody>
        </table>
    );

    const sendEmailsToUsers = () => {
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
                window.location.reload();
            })
            .catch((errors) => {
                setLoading(false);
                console.log(
                    'send emails to users failed errors is',
                    JSON.stringify(errors),
                );
            });
    };

    const getExcelFile = () => {
        setLoading(false);
        window.location.href =
            '/api/generateExcel/getLatest/ResponsesExcel.xlsx';
    };

    const downloadLatestResponsesExcel = () => {
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
                questions,
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
                    JSON.stringify(errors),
                );
                alert(
                    'Error writing the exel sheet please contact administrator.',
                );
            });
    };
    const downloadAllResponsesExcel = () => {
        const includedResponses = questionnaireResponses.sort((a, b) => {
            if (a.agency < b.agency) return -1;
            if (a.agency > b.agency) return 1;
            return 0;
        });
        const requestObj = {
            url: generateResponsesExcel,
            method: 'POST',
            body: JSON.stringify({
                questions,
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
                    JSON.stringify(errors),
                );
                alert(
                    'Error writing the exel sheet please contact administrator.',
                );
            });
    };

    React.useEffect(() => {
        const requestObj = {
            url: `${getQuestions}/${workshopTitle}.en`,
        };
        sendRequest<{ questions: Array<string>, }>(requestObj).then((response) => {
            setQuestions(response.questions);
        });
    }, []);

    const loadingMarkup = loading
        ? (
            <div className="loading is-vcentered">Loading...</div>
        )
        : null;

    return (
        <section>
            <Navbar 
                content={content} 
                dashboard={true} 
                language={language}
                setLanguage={setLanguage}
            />
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
                        onClick={downloadLatestResponsesExcel} />
                    <Button
                        label="Download All Excel"
                        onClick={downloadAllResponsesExcel} />
                </section>
                <section></section>
                <section className="dashboard-section-title">
                    <input
                        placeholder="Search"
                        className="input-box"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        name="name" />
                    <select
                        className="dropdown-select"
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                        name="cars"
                        id="cars"
                    >
                        <option value="full_name">Name</option>
                        <option value="email">Email</option>
                        <option value="mobile_phone">Phone</option>
                        <option value="US_zipcode">Zip</option>
                    </select>
                </section>
                <section>
                    <h2 className="dashboard-section-title">Details</h2>
                    {responsesTable}
                </section>
            </section>
        </section>
    );
}
