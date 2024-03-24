import React from 'react';
import { sendRequest } from '../../sendRequest/sendRequest';
import { Navigate } from 'react-router-dom';
import { apis } from '../../sendRequest/apis';
import './LoginRegister.css';

type LoginState = 
| {
    email: string;
    password: string;
    loggedIn: boolean;
    name?: string;
};
export function Login() {
    const [loginState, setLoginState] = React.useState<LoginState>({
        email: '',
        password: '',
        loggedIn: false,
    });

    const requestObj = React.useMemo(() => {
        return {
            url: apis.loginApi,
            method: 'POST',
            body: JSON.stringify({
                email: loginState.email,
                password: btoa(loginState.password),
            }),
        };
    }, [loginState.email, loginState.password]);

    const submitLogin = React.useCallback(async (e: unknown) => {
        const body = await sendRequest<{
            jwt?: string;
            name?: string;
        }>(requestObj);
        if ((body.jwt != null) && (body.name != null)) {
            localStorage.setItem('jwt-eimmigrate', body.jwt);
            setLoginState(curr => {
                return { 
                    ...curr,
                    loggedIn: true, 
                    name: body.name,
                };
            });
        }
    }, [requestObj]);

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((event) => {
        const { name, value } = event.target;
        setLoginState((loginState) => ({
            ...loginState,
            [name]: value,
        }));
    }, []);

    if (loginState.loggedIn) {
        return (
            <Navigate
                state={{ name: loginState.name }}
                to={{
                    pathname: '/dashboard',
                }} />
        );
    }

    

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
                    onClick={submitLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
