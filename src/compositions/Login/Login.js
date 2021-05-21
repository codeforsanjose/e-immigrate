import React, { useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { Redirect } from 'react-router-dom';
import { loginApi } from '../../sendRequest/apis';

import '../Admin/LoginRegister.css';

const Login = (props) => {
    const [loginState, setLoginState] = useState({
        email: '',
        password: '',
        loggedIn: false,
    });

    const requestObj = {
        url: loginApi,
        method: 'POST',
        body: JSON.stringify({
            email: LoginState.email,
            password: btoa(LoginState.password),
        }),
    };

    const submitLogin = (e) => {
        sendRequest(requestObj).then((body) => {
            if (body.jwt && body.name) {
                localStorage.setItem('jwt-eimmigrate', body.jwt);
                setLoginState({ loggedIn: true, name: body.name });
            }
        });
    };

    if (loginState.loggedIn) {
        return (
            <Redirect
                to={{
                    pathname: '/dashboard',
                    state: { name: LoginState.name },
                }}
            />
        );
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginState((LoginState) => ({
            ...LoginState,
            [name]: value,
        }));
    };

    return (
        <div className="Login">
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

export default Login;
