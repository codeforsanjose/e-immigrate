import React from 'react';

import './LandingPage.css';

const LandingPage = ({ welcomeMessage }) => {
    return (
        <div className="LandingPage">
            <div className="welcome-message">
                <h1>{welcomeMessage.line1}</h1>
                <div className="line2">{welcomeMessage.line2}</div>
            </div>
            <img src="https://blush.ly/mM4xntXUA/p" alt="people" />
        </div>
    );
};

export default LandingPage;
