import React from 'react';
import { ReactComponent as VideoIcon } from '../../data/images/VideoIcon.svg';
import { ReactComponent as QuestionnaireIcon } from '../../data/images/QuestionnaireIcon.svg';
import { ReactComponent as CheckMark } from '../../data/images/CheckMark.svg';
import { ReactComponent as Blob1 } from '../../data/images/Blob1.svg';
import { ReactComponent as Blob2 } from '../../data/images/Blob2.svg';
import { ReactComponent as Blob3 } from '../../data/images/Blob3.svg';

import './ProgressBar.css';

const ProgressBar = ({ content, step }) => {
    const Step = ({ content, stepNumber, children, completed }) => {
        const isComplete = completed ? '' : 'incomplete';
        const step = `step${stepNumber}Header`;
        const title = `step${stepNumber}Title`;
        return (
            <div className={`stepContainer ${isComplete}`}>
                <div className={`stepNumber ${isComplete}`}>
                    {content[step]}
                </div>
                <div className={`stepTitle ${isComplete}`}>
                    {content[title]}
                </div>
                <div className={`stepIcon ${isComplete}`}>{children}</div>
            </div>
        );
    };

    return (
        <div className="progressBar">
            <div className="title">{content.progressBarHeader}</div>
            <div className="stepsGrid">
                <Step
                    content={content}
                    stepNumber={'1'}
                    completed={step >= 1 ? true : false}
                >
                    <Blob1 className="blob blob1" />
                    <VideoIcon className="stepSVG" height="32px" width="32px" />
                </Step>
                <Step
                    content={content}
                    stepNumber={'2'}
                    completed={step >= 2 ? true : false}
                >
                    <Blob2 className="blob blob2" />
                    <QuestionnaireIcon
                        className="stepSVG"
                        height="32px"
                        width="32px"
                    />
                </Step>
                <Step
                    content={content}
                    stepNumber={'3'}
                    completed={step >= 3 ? true : false}
                >
                    <Blob3 className="blob blob3" />
                    <CheckMark className="stepSVG" height="32px" width="32px" />
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
