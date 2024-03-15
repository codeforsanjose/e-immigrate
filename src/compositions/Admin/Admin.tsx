import React from 'react';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import './Admin.css';

export function Admin() {
    const [adminState, setAdminState] = React.useState({
        isLoginOpen: true,
        isRegisterOpen: false,
    });

    const showLogin = React.useCallback(() => {
        setAdminState({ isLoginOpen: true, isRegisterOpen: false });
    }, []);

    const showRegister = React.useCallback(() => {
        setAdminState({ isRegisterOpen: true, isLoginOpen: false });
    }, []);

    let loginClassName = 'tab';
    let registerClassName = 'tab';

    if (adminState.isLoginOpen) {
        loginClassName = 'tab selected-tab';
    } else {
        registerClassName = 'tab selected-tab';
    }

    const login = adminState.isLoginOpen && <Login />;
    const register = adminState.isRegisterOpen && <Register />;
    return (
        <div className="Admin">
            <div className="admin-tab-nav">
                <div className={loginClassName} onClick={showLogin}>
                    Login
                </div>
                <div className={registerClassName} onClick={showRegister}>
                    Register
                </div>
            </div>

            <div className="tab-container">
                {login}
                {register}
            </div>
        </div>
    );
}