import React from 'react';
import { ReactComponent as VideoIcon } from '../../data/images/VideoIcon.svg';
import { ReactComponent as HubspotIcon } from '../../data/images/HubspotIcon.svg';
import { ReactComponent as ConsultationIcon } from '../../data/images/ConsultationIcon.svg';

import './LandingPage.css';

const Step = ({ stepContent, children }) => {
    return (
        <div className="stepContainer">
            <div className="stepNumber">{stepContent.step}</div>
            <div className="stepTitle">{stepContent.title}</div>
            <div className="stepIcon">{children}</div>
            <div className="stepDescription">{stepContent.description}</div>
        </div>
    );
};

const LandingPage = ({ content }) => {
    const { welcomeMessage, video, hubspot, consultation } = content;
    return (
        <div className="LandingPage">
            <div className="welcome-message">
                <h1>{welcomeMessage.line1}</h1>
                <div className="line2">{welcomeMessage.line2}</div>
            </div>
            <div className="gridContainer">
                <div className="stepsGrid">
                    <Step stepContent={video}>
                        <VideoIcon />
                    </Step>
                    <Step stepContent={hubspot}>
                        <HubspotIcon />
                    </Step>
                    <Step stepContent={consultation}>
                        <ConsultationIcon />
                    </Step>
                </div>
            </div>
            {/* <img src="https://blush.ly/mM4xntXUA/p" alt="people" /> */}
        </div>
    );
};

export default LandingPage;
