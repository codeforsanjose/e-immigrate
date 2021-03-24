import React, { useState, useEffect, useMemo } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getQuestionnaireResponse } from '../../sendRequest/apis';
import { getAuthToken } from '../../utilities/auth_utils';
import './AdminDashboard.css';

const AdminDashboard = (props) => {
    const [questionnaireResponses, setQuestionnaireResponses] = useState([]);
    const [selectedResponses, setSelectedResponses] = useState([]);
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

    const selectResponseCheckbox = (e, index) => {
        const found = selectedResponses.find((item) => item === index);
        if (found) {
            const selectedResponsesFiltered = selectedResponses.filter(
                (item) => item === index
            );
            setSelectedResponses(selectedResponsesFiltered);
        } else {
            setSelectedResponses([...selectedResponses, index]);
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
                        <article className={`answer ${flagIt}`}>
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
                            <input
                                type="checkbox"
                                checked={selectedResponses.find(
                                    (item) => item === index
                                )}
                                onClick={(e) =>
                                    selectResponseCheckbox(e, index)
                                }
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

    return (
        <section className="AdminDashboard">
            <article className="overview-container">
                <h3>Overview</h3>
                {overviewMarkup}
            </article>
            <section>
                <h3>Details</h3>
                {responsesTable}
            </section>
        </section>
    );
};

export default AdminDashboard;
