import React, { useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { Redirect } from 'react-router-dom';
import { loginApi } from '../../sendRequest/apis';

import './LoginRegister.css';

const LoginBox = (props) => {
    const [loginBoxState, setLoginBoxState] = useState({
        email: '',
        password: '',
        loggedIn: false,
    });

    let requestObj = {
        url: loginApi,
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            email: loginBoxState.email,
            password: btoa(loginBoxState.password),
        }),
    };

    const submitLogin = (e) => {
        sendRequest(requestObj).then((body) => {
            if (body.jwt && body.name) {
                localStorage.setItem('jwt-eimmigrate', body.jwt);
                setLoginBoxState({ loggedIn: true, name: body.name });
            }
        });
    };

    if (loginBoxState.loggedIn) {
        return (
            <Redirect
                to={{
                    pathname: '/users',
                    state: { name: loginBoxState.name },
                }}
            />
        );
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginBoxState((loginBoxState) => ({
            ...loginBoxState,
            [name]: value,
        }));
    };

    return (
        <div className="LoginBox">
            <div className="header">Login</div>
            <div className="login-form">
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        className="login-input"
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="login-input"
                        onChange={handleInputChange}
                        placeholder="Password"
                    />
                </div>

                <button
                    type="button"
                    className="login-btn"
                    onClick={submitLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginBox;
