import React from 'react';
import { ReactComponent as VideoIcon } from '../../data/images/VideoIcon.svg';
import { ReactComponent as HubspotIcon } from '../../data/images/HubspotIcon.svg';
import { ReactComponent as ConsultationIcon } from '../../data/images/ConsultationIcon.svg';
import Button from '../../components/Button/Button';
import { useHistory } from 'react-router-dom';

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

const LandingPage = ({ content, nextStep }) => {
    let history = useHistory();
    const { welcomeMessage, video, hubspot, consultation } = content;
    const goToStep1 = () => {
        nextStep();
        history.push('/video');
    };
    const goToStep2 = () => {
        nextStep();
        history.push('/questionnaire');
    };
    return (
        <div className="LandingPage">
            <div className="welcome-message">
                <h1>{welcomeMessage.line1}</h1>
                <div className="line2">{welcomeMessage.line2}</div>
            </div>
            <div className="gridContainer">
                <div className="stepsGrid">
                    <Step stepContent={video}>
                        <VideoIcon className="stepSVG" />
                    </Step>
                    <Step stepContent={hubspot}>
                        <HubspotIcon className="stepSVG" />
                    </Step>
                    <Step stepContent={consultation}>
                        <ConsultationIcon className="stepSVG" />
                    </Step>
                </div>
            </div>
            <div className="startButtonContainer">
                <Button label={'Go to Step 1'} onClick={goToStep1} />
                <Button label={'Go to Step 2'} onClick={goToStep2} />
            </div>
        </div>
    );
};

export default LandingPage;
