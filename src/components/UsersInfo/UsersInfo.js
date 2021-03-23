import React, { useState, useEffect } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getQuestionnaireResponse } from '../../sendRequest/apis';
import { withRouter } from 'react-router-dom';
import './UsersInfo.css';

const UsersInfo = (props) => {
    const [questionnaireResponses, setQuestionnaireResponses] = useState([]);

    useEffect(() => {
        let jwt = localStorage.getItem('jwt-eimmigrate');
        if (!jwt) {
            return props.history.push('/login');
        } else {
            let requestObj = {
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

export default withRouter(UsersInfo);
