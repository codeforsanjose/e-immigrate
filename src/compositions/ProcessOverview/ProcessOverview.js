import React from 'react';
import { ReactComponent as VideoIcon } from '../../data/images/VideoIcon.svg';
import { ReactComponent as QuestionnaireIcon } from '../../data/images/QuestionnaireIcon.svg';
import { ReactComponent as CheckMark } from '../../data/images/CheckMark.svg';
import { ReactComponent as Blob1 } from '../../data/images/Blob1.svg';
import { ReactComponent as Blob2 } from '../../data/images/Blob2.svg';
import { ReactComponent as Blob3 } from '../../data/images/Blob3.svg';
import { ReactComponent as Arrow } from '../../data/images/Arrow.svg';
import Button from '../../components/Button/Button';
import { useHistory } from 'react-router-dom';

import './ProcessOverview.css';

const Step = ({ stepContent, children }) => {
    return (
        <div className="stepContainer">
            <div className="stepNumber">{stepContent.step}</div>
            <div className="stepIcon">{children}</div>
            <div className="stepTitle">{stepContent.title}</div>
            <div className="stepDescription">{stepContent.description}</div>
        </div>
    );
};

const LandingPage = ({ content, nextStep }) => {
    let history = useHistory();
    const { video, hubspot, consultation } = content;
    const goToStep1 = () => {
        nextStep();
        history.push('/video');
    };
    return (
        <div className="ProcessOverview">
            <div className="welcome-message">
                <h1>Welcome to the Virtual Citizenship Workshop</h1>
                <div className="line2">Congratulations!</div>
                <div className="line3">
                    Based on your answers, you can pariticipate in this
                    workshop. Follow the steps below.
                </div>
            </div>
            <div className="gridContainer">
                <div className="stepsGrid">
                    <Step stepContent={video}>
                        <Blob1 className="blob blob1" />
                        <VideoIcon className="stepSVG" />
                    </Step>
                    <Arrow className="arrow" />
                    <Step stepContent={hubspot}>
                        <Blob2 className="blob blob2" />
                        <QuestionnaireIcon className="stepSVG" />
                    </Step>
                    <Arrow className="arrow" />
                    <Step stepContent={consultation}>
                        <Blob3 className="blob blob3" />
                        <CheckMark className="stepSVG" />
                    </Step>
                </div>
            </div>
            <div className="startButtonContainer">
                <Button label={'Go to Step 1'} onClick={goToStep1} />
            </div>
        </div>
    );
};

export default LandingPage;
