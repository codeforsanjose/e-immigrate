import React, { useState } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './Admin.css';

const Admin = ({}) => {
    const [adminState, setAdminState] = useState({
        isLoginOpen: true,
        isRegisterOpen: false,
    });

    const showLogin = () => {
        setAdminState({ isLoginOpen: true, isRegisterOpen: false });
    };

    const showRegister = () => {
        setAdminState({ isRegisterOpen: true, isLoginOpen: false });
    };

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
};

export default Admin;
