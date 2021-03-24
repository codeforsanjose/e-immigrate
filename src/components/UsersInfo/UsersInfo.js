import React, { useState, useEffect } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getQuestionnaireResponse } from '../../sendRequest/apis';
import { getAuthToken } from '../../utilities/auth_utils';
import './UsersInfo.css';

const UsersInfo = (props) => {
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
                setQuestionnaireResponses(responses);
            });
        }
    }, [props.history]);

    const responsesMarkup = questionnaireResponses.map(
        (questionnaireResponse, index) => (
            <li key={questionnaireResponse._id}>
                <div>response: {questionnaireResponse._id}</div>
            </li>
        )
    );
    return (
        <div>
            <div className="responses-list">
                <ol>{responsesMarkup}</ol>
            </div>
        </div>
    );
};

export default UsersInfo;
