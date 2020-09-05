import React, { useState, useEffect } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getUsers } from '../../sendRequest/apis';
import { withRouter } from 'react-router-dom';
import './UsersInfo.css';

const UsersInfo = (props) => {
    const [usersInfoState, setUsersInfoState] = useState({
        usernames: [],
        admin: '',
    });

    useEffect(() => {
        let jwt = localStorage.getItem('jwt-eimmigrate');
        if (!jwt) {
            return props.history.push('/login');
        } else {
            let requestObj = {
                url: getUsers,
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            };
            sendRequest(requestObj).then((usersInfo) => {
                setUsersInfoState({
                    usernames: usersInfo.users,
                    admin: usersInfo.admin.name,
                });
            });
        }
    }, [props.history]);

    const usernames = usersInfoState.usernames.map((user) => (
        <li key={user._id}>
            <div className="user-name">Name: {user.name}</div>
            <div className="phone-number">Phone number: {user.phoneNumber}</div>
            <div className="docs">Document: {user.document}</div>
        </li>
    ));
    const admin = usersInfoState.admin;
    return (
        <div>
            <div className="users-info">Hello {admin}! Our users are:</div>
            <div className="user-list">
                <ol>{usernames}</ol>
            </div>
        </div>
    );
};

export default withRouter(UsersInfo);
