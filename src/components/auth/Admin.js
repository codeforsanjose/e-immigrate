import React, { useState } from 'react';
import LoginBox from './LoginBox.js';
import RegisterBox from './RegisterBox.js';
import './Admin.css';

const Admin = (props) => {
    const [adminState, setAdminState] = useState({
        isLoginOpen: true,
        isRegisterOpen: false,
    });

    const showLoginBox = () => {
        setAdminState({ isLoginOpen: true, isRegisterOpen: false });
    };

    const showRegisterBox = () => {
        setAdminState({ isRegisterOpen: true, isLoginOpen: false });
    };

    let loginClassName = 'tab';
    let registerClassName = 'tab';

    if (adminState.isLoginOpen) {
        loginClassName = 'tab selected-tab';
    } else {
        registerClassName = 'tab selected-tab';
    }

    const loginBox = adminState.isLoginOpen && <LoginBox />;
    const registerBox = adminState.isRegisterOpen && <RegisterBox />;
    return (
        <div className="Admin">
            <div className="admin-tab-nav">
                <div className={loginClassName} onClick={showLoginBox}>
                    Login
                </div>
                <div className={registerClassName} onClick={showRegisterBox}>
                    Register
                </div>
            </div>

            <div className="tab-container">
                {loginBox}
                {registerBox}
            </div>
        </div>
    );
};

export default Admin;
