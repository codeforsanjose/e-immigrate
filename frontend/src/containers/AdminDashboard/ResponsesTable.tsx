import React from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { format } from 'date-fns';
import { apis } from '../../sendRequest/apis';
import { getAuthToken } from '../../utilities/auth_utils';
import { searchArrayObjects } from '../../utilities/search_array';
import './AdminDashboard.css';
import { languageOptions } from '../../data/LanguageOptions';
import { defaultCompare } from '../../utilities/defaultCompare';
import { useNavigate } from 'react-router-dom';
import { apiUrlFormatters } from '../../sendRequest/apiUrlFormatters';
import SortArrow from '../../data/images/SortArrow.svg';
import { isAgencyObject, isValueYes } from './helpers';
import { AGENCIES, DESCRIPTIVE_TIMESTAMP, questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire } from './constants';
import { QuestionnaireResponseElement } from './types';


function AgencyOptions() {
    return (
        <>
            <option key="agency-initial" value="">
                Please select
            </option>
            {AGENCIES.map((agency, index) => {
                return (
                    <option key={`agency-${index}`} value={agency}>
                        {agency}
                    </option>
                );
            })}
        </>
    );
}


type ResponseTableHeaderColumnProps = {
    children: React.ReactNode;
    className: string;
    onClick: () => void;
};
function ResponseTableHeaderColumn(props: ResponseTableHeaderColumnProps) {
    const {
        children,
        className,
        onClick,
    } = props;
    return (
        <th>
            {children}
            <SortArrow
                className={className}
                onClick={onClick} />
        </th>
    );
}


type ResponseTableHeaderRowProps = {
    createdOrder: boolean;
    sortCreated: () => void;
    updatedOrder: boolean;
    sortUpdated: () => void;
    flagOrder: boolean;
    sortFlags: () => void;
    emailOrder: boolean;
    sortEmail: () => void;
    downloadOrder: boolean;
    sortDownload: () => void;
};
function ResponseTableHeaderRow(props: ResponseTableHeaderRowProps) {
    const {
        createdOrder,
        sortCreated,
        updatedOrder,
        sortUpdated,
        flagOrder,
        sortFlags,
        emailOrder,
        sortEmail,
        downloadOrder,
        sortDownload,
    } = props;
    return (
        <tr className="header-row">
            <th>#</th>
            <ResponseTableHeaderColumn 
                className={createdOrder ? '' : 'up'}
                onClick={sortCreated}
            >
                Created
            </ResponseTableHeaderColumn>
            <ResponseTableHeaderColumn 
                className={updatedOrder ? '' : 'up'}
                onClick={sortUpdated}
            >
                Updated
            </ResponseTableHeaderColumn>
            <ResponseTableHeaderColumn 
                className={flagOrder ? 'up' : ''}
                onClick={sortFlags}
            >
                Flag
            </ResponseTableHeaderColumn>
            <th>Agency</th>
            <ResponseTableHeaderColumn 
                className={emailOrder ? 'up' : ''}
                onClick={sortEmail}
            >
                Email Sent
            </ResponseTableHeaderColumn>
            <ResponseTableHeaderColumn 
                className={downloadOrder ? 'up' : ''}
                onClick={sortDownload}
            >
                Response Downloaded
            </ResponseTableHeaderColumn>
            <th></th>
            <th>Responses</th>
        </tr>
    );
}

type ResponseTableRowProps = {
    toggleFlag: (response: QuestionnaireResponseElement) => Promise<void>;
    response: QuestionnaireResponseElement;
    index: number;
    resetEmail: (response: QuestionnaireResponseElement) => Promise<void>;
    softDeleteResponse: (index: number) => Promise<void>;
    assignResponseAgency: (response: QuestionnaireResponseElement, agency: string) => Promise<void>;
};

function ResponseTableRow(props: ResponseTableRowProps) {
    const {
        response,
        toggleFlag,
        index,
        softDeleteResponse,
        resetEmail,
        assignResponseAgency,
    } = props;

    const { questionnaireResponse } = response;
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
    const policeExplinationMarkupQuestion = (questionnaireResponse.contact_with_police_explanation != null && questionnaireResponse.contact_with_police_explanation.length > 0)
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
            ? isValueYes(questionnaireResponse[questionKey])
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
                    onClick={async (e) => await toggleFlag(response)}
                ></div>
            </td>
            <td>
                <label htmlFor="agency-select">Assigned To:</label>
                <select
                    id="agency-select"
                    value={response.agency}
                    onChange={async (e) => await assignResponseAgency(response, e.target.value)}
                >
                    <AgencyOptions />
                </select>
            </td>
            <td>
                <span>{(response.emailSent ?? false) ? 'Yes' : 'No'}</span>
                <button onClick={async (e) => await resetEmail(response)}>
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
                    onClick={async (e) => await softDeleteResponse(index)}
                ></div>
            </td>
            <td>
                <div className="all-answers">{allTheAnswers}</div>
            </td>
        </tr>
    );
}






type ResponsesTableProps = {
    filterBy: string;
    searchTerm: string;
    setLoading: (state: boolean) => void;
};

type UpdateAgencyElement = {
    id: string;
    agency?: string;
};
async function updateAgencyAsync(values: Array<UpdateAgencyElement>) {
    const requestObj = {
        url: apis.agencyAssignURL,
        method: 'POST',
        body: JSON.stringify([...values]),
    };
    const jwt = getAuthToken();
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return await sendRequest<Array<QuestionnaireResponseElement>>(requestObj, headers);
}

type UpdateFlagElement = {
    id: string;
    flag?: boolean;
};
async function updateFlagAsync(values: Array<UpdateFlagElement>) {
    const requestObj = {
        url: apis.assignResponseFlag,
        method: 'POST',
        body: JSON.stringify([...values]),
    };
    const jwt = getAuthToken();
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return await sendRequest<Array<QuestionnaireResponseElement>>(requestObj, headers);
}

type UpdateEmailSentElement = {
    id: string;
    emailSent?: boolean;
};
async function updateEmailSentAsync(values: Array<UpdateEmailSentElement>) {
    const requestObj = {
        url: apis.assignEmail,
        method: 'POST',
        body: JSON.stringify([...values]),
    };
    const jwt = getAuthToken();
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return await sendRequest<Array<QuestionnaireResponseElement>>(requestObj, headers);
}
function updateQuestionnaireResponses(current: Array<QuestionnaireResponseElement>, response: Array<QuestionnaireResponseElement>): Array<QuestionnaireResponseElement> {
    const updatedResponseMap = response.reduce<Record<string, QuestionnaireResponseElement>>((prev, cur) => {
        return {
            ...prev,
            [cur._id]: cur,
        };
    }, {});
    return current.map(x => {
        if (x._id in updatedResponseMap) {
            return updatedResponseMap[x._id];
        }
        return x;
    });
}

export function ResponsesTable(props: ResponsesTableProps) {
    const {
        filterBy,
        searchTerm,
        setLoading,
    } = props;
    const navigate = useNavigate();
    const [questionnaireResponses, setQuestionnaireResponses] = React.useState<Array<QuestionnaireResponseElement>>([]);
    const [flagOrder, setFlagOrder] = React.useState(false);
    const [emailOrder, setEmailOrder] = React.useState(false);
    const [downloadOrder, setDownloadOrder] = React.useState(false);
    const [createdOrder, setCreatedOrder] = React.useState(true);
    const [updatedOrder, setUpdatedOrder] = React.useState(true);
    React.useEffect(() => {
        async function inner() {
            setLoading(true);
            const jwt = getAuthToken();
            if (jwt === null) {
                navigate('/login');
                return;
            }
            else {
                const headers = {
                    Authorization: `Bearer ${jwt}`,
                };
                const response = await sendRequest<{
                    responses: Array<QuestionnaireResponseElement>;
                }>({
                    url: apis.getAllQuestionnaireResponse,
                }, headers);
                const { responses } = response;
                console.log({
                    responses,
                });
                const updatedResponses = responses
                    .map((item) => {
                        const { questionnaireResponse } = item;
                        const newFlag = (item.flagOverride ?? false)
                            ? item.flag
                            : Object.entries(questionnaireResponse).reduce(
                                (acc, stuff) => {
                                    const [key, value] = stuff;
                                    return !questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire.includes(
                                        key,
                                    )
                                        ? isValueYes(value) ? true : acc
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
                console.log({
                    updatedResponses,
                });
                setQuestionnaireResponses(updatedResponses);
            }
        }
        void inner();
    }, [navigate, setLoading]);

    const toggleFlag = React.useCallback(async (response: QuestionnaireResponseElement) => {
        const result = await updateFlagAsync([{
            id: response._id,
            flag: !(response.flag ?? false),
        }]);
        setQuestionnaireResponses(current => updateQuestionnaireResponses(current, result));
    }, []);

    const assignResponseAgency = React.useCallback(async (response: QuestionnaireResponseElement, agency: string) => {
        const result = await updateAgencyAsync([{
            id: response._id,
            agency,
        }]);
        setQuestionnaireResponses(current => updateQuestionnaireResponses(current, result));
    }, []);

    const resetEmail = React.useCallback(async (response: QuestionnaireResponseElement) => {
        const result = await updateEmailSentAsync([{
            id: response._id,
            emailSent: false,
        }]);
        setQuestionnaireResponses(current => updateQuestionnaireResponses(current, result));
        // const updatedResponses = questionnaireResponses.map(
        //     (item, responseIndex) => {
        //         return {
        //             ...item,
        //             emailSent: responseIndex === index ? false : item.emailSent,
        //         };
        //     },
        // );
        // const responseToUpdate = updatedResponses.reduce(
        //     (accumulator, item, responseIndex) => {
        //         return responseIndex === index ? item : accumulator;
        //     },
        //     {},
        // );
        // const requestObj = {
        //     url: apis.assignEmail,
        //     method: 'POST',
        //     body: JSON.stringify({
        //         responsesToUpdate: [responseToUpdate],
        //     }),
        // };
        // const jwt = getAuthToken();
        // const headers = {
        //     Authorization: `Bearer ${jwt}`,
        // };
        // await sendRequest(requestObj, headers);
        // setQuestionnaireResponses(updatedResponses);
    }, []);


    type HeaderState = boolean;
    type SetHeaderState = (value: HeaderState) => void;
    type SortFunction = (property: keyof QuestionnaireResponseElement, headerState: HeaderState, setHeaderState: SetHeaderState) => void;

    const sortAscending: SortFunction = React.useCallback((property, headerState, setHeaderState) => {
        setQuestionnaireResponses(current => {
            return current.sort((a, b) => {
                return defaultCompare(a[property], b[property]);
            });
        });
        setHeaderState(!headerState);
    }, []);

    
    const sortDescending: SortFunction = React.useCallback((property, headerState, setHeaderState) => {
        setQuestionnaireResponses(current => {
            return current.sort((a, b) => {
                return -defaultCompare(a[property], b[property]);
            });
        });
        setHeaderState(!headerState);
    }, []);
    const autoSort: SortFunction = React.useCallback((property, headerState, setHeaderState) => {
        if (headerState) {
            sortAscending(property, headerState, setHeaderState);
        }
        else {
            sortDescending(property, headerState, setHeaderState);
        }
    }, [sortAscending, sortDescending]);



    const sortAscendingUndefined: SortFunction = React.useCallback((property, headerState, setHeaderState) => {
        setQuestionnaireResponses(current => {
            return current.sort((a, b) => {
                if ((Boolean(a[property])) && !(Boolean(b[property]))) return -1;
                if (!(Boolean(a[property])) && (Boolean(b[property]))) return 1;
                return 0;
            });
        });
        setHeaderState(!headerState);
    }, []);
    const sortDescendingUndefined: SortFunction = React.useCallback((property, headerState, setHeaderState) => {
        setQuestionnaireResponses(current => {
            return current.sort((a, b) => {
                if ((Boolean(a[property])) && !(Boolean(b[property]))) return 1;
                if (!(Boolean(a[property])) && (Boolean(b[property]))) return -1;
                return 0;
            });
        });
        setHeaderState(!headerState);
    }, []);
    const autoSortUndefined: SortFunction = React.useCallback((property, headerState, setHeaderState) => {
        if (headerState) {
            sortAscendingUndefined(property, headerState, setHeaderState);
        }
        else {
            sortDescendingUndefined(property, headerState, setHeaderState);
        }
    }, [sortAscendingUndefined, sortDescendingUndefined]);


    const sortFlags = React.useCallback(() => {
        autoSort('flag', flagOrder, setFlagOrder);
    }, [autoSort, flagOrder]);


    const sortEmail = React.useCallback(() => {
        autoSortUndefined('emailSent', emailOrder, setEmailOrder);
    }, [autoSortUndefined, emailOrder]);
    const sortDownload = React.useCallback(() => {
        autoSortUndefined('responseDownloadedToExcel', downloadOrder, setDownloadOrder);
    }, [autoSortUndefined, downloadOrder]);

    const sortCreated = React.useCallback(() => {
        autoSort('createdAt', createdOrder, setCreatedOrder);
    }, [autoSort, createdOrder]);
    const sortUpdated = React.useCallback(() => {
        autoSort('updatedAt', updatedOrder, setUpdatedOrder);
    }, [autoSort, updatedOrder]);

    const softDeleteResponse = React.useCallback(async (resIndex: number) => {
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
            url: apiUrlFormatters.deleteQuestionnaireResponse({
                id: response_id,
            }),
            method: 'PUT',
        };
        const jwt = getAuthToken();
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        try {
            await sendRequest(requestObj, headers);
            setQuestionnaireResponses(updatedResponses);
        }
        catch (err) {
            console.log(
                `error soft-deleting questionnaire response ${response_id}`,
                err,
            );
        }
    }, [questionnaireResponses]);

    
    const filterQuestionnaireResponses = React.useMemo(() => {
        if (searchTerm == null || searchTerm === '') return questionnaireResponses;
        return searchArrayObjects(
            questionnaireResponses,
            `questionnaireResponse.${filterBy}`,
            searchTerm,
            3,
        );
    }, [filterBy, questionnaireResponses, searchTerm]);
    
    return (
        <table className="responses">
            <tbody>
                <ResponseTableHeaderRow
                    createdOrder={createdOrder}
                    sortCreated={sortCreated}
                    downloadOrder={downloadOrder}
                    emailOrder={emailOrder}
                    flagOrder={flagOrder}
                    updatedOrder={updatedOrder}
                    sortDownload={sortDownload}
                    sortEmail={sortEmail}
                    sortFlags={sortFlags}
                    sortUpdated={sortUpdated}
                />
                {filterQuestionnaireResponses.map((response, index) => {
                    return (
                        <ResponseTableRow
                            key={response._id}
                            response={response}
                            index={index}
                            toggleFlag={toggleFlag}
                            assignResponseAgency={assignResponseAgency}
                            resetEmail={resetEmail}
                            softDeleteResponse={softDeleteResponse}
                        />
                    );
                })}
            </tbody>
        </table>
    );
}
