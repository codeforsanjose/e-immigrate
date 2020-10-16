import React from 'react';
import { ReactComponent as VideoIcon } from '../../data/images/VideoIcon.svg';
import { ReactComponent as HubspotIcon } from '../../data/images/HubspotIcon.svg';
import { ReactComponent as ConsultationIcon } from '../../data/images/ConsultationIcon.svg';

import './ProgressBar.css';

const ProgressBar = ({ content, step }) => {
    const { video, hubspot, consultation } = content;

    const Step = ({ stepContent, children, completed }) => {
        const isComplete = completed ? '' : 'incomplete';
        return (
            <div className={`stepContainer ${isComplete}`}>
                <div className={`stepNumber ${isComplete}`}>
                    {stepContent.step}
                </div>
                <div className={`stepTitle ${isComplete}`}>
                    {stepContent.title}
                </div>
                <div className={`stepIcon ${isComplete}`}>{children}</div>
            </div>
        );
    };

    return (
        <div className="progressBar">
            <div className="stepsGrid">
                <Step stepContent={video} completed={step >= 1 ? true : false}>
                    <VideoIcon className="stepSVG" />
                </Step>
                <Step
                    stepContent={hubspot}
                    completed={step >= 2 ? true : false}
                >
                    <HubspotIcon className="stepSVG" />
                </Step>
                <Step
                    stepContent={consultation}
                    completed={step >= 3 ? true : false}
                >
                    <ConsultationIcon className="stepSVG" />
                </Step>
            </div>
            <div className="linesGridContainer">
                <div className="linesGrid">
                    <div
                        className={`progressLine1 ${
                            step >= 2 ? '' : 'incomplete'
                        }`}
                    ></div>
                    <div
                        className={`progressLine2 ${
                            step >= 3 ? '' : 'incomplete'
                        }`}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
