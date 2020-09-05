import React, { useState } from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { registerApi } from '../../sendRequest/apis';
import { Redirect } from 'react-router-dom';

import './LoginRegister.css';

const RegisterBox = (props) => {
    const [registerBoxState, setRegisterBoxState] = useState({
        email: '',
        password: '',
        name: '',
        loggedIn: false,
    });

    let requestObj = {
        url: registerApi,
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            email: registerBoxState.email,
            password: btoa(registerBoxState.password),
            name: registerBoxState.name,
        }),
    };

    const submitRegister = (e) => {
        sendRequest(requestObj).then((body) => {
            if (body.jwt && body.name) {
                localStorage.setItem('jwt-eimmigrate', body.jwt);
                setRegisterBoxState({ loggedIn: true, name: body.name });
            }
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRegisterBoxState((registerBoxState) => ({
            ...registerBoxState,
            [name]: value,
        }));
    };

    if (registerBoxState.loggedIn) {
        return (
            <Redirect
                to={{
                    pathname: '/users',
                    state: { name: registerBoxState.name },
                }}
            />
        );
    }

    return (
        <div className="RegisterBox">
            <div className="header">Register</div>
            <div className="login-form">
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="login-input"
                        onChange={handleInputChange}
                        placeholder="Name"
                    />
                </div>

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
                    onClick={submitRegister}
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default RegisterBox;
