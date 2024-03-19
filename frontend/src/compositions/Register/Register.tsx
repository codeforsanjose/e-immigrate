import React from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { apis } from '../../sendRequest/apis';
import { Navigate } from 'react-router-dom';

import '../Login/LoginRegister.css';

export function Register() {
    const [registerBoxState, setRegisterBoxState] = React.useState({
        email: '',
        password: '',
        name: '',
        loggedIn: false,
    });

    const requestObj = {
        url: apis.registerApi,
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

    const submitRegister = () => {
        sendRequest<{
            jwt?: string;
            name?: string;
        }>(requestObj).then((body) => {
            if (body.jwt != null && body.name != null) {
                const _name = body.name;
                localStorage.setItem('jwt-eimmigrate', body.jwt);
                setRegisterBoxState(current => {
                    return { 
                        ...current,
                        loggedIn: true, 
                        name: _name,
                    };
                });
            }
        });
    };

    const handleInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegisterBoxState((registerBoxState) => ({
            ...registerBoxState,
            [name]: value,
        }));
    }, []);

    if (registerBoxState.loggedIn) {
        return (
            <Navigate
                state={{ name: registerBoxState.name }}
                to={{ pathname: '/dashboard' }} 
            />
        );
    }

    return (
        <div className="Register">
            <div className="header">Register</div>
            <div className="login-form">
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="login-input"
                        onChange={handleInputChange}
                        placeholder="Name" />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        className="login-input"
                        onChange={handleInputChange}
                        placeholder="Email" />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="login-input"
                        onChange={handleInputChange}
                        placeholder="Password" />
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
}
