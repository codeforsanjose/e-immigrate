import React from 'react';
import VideoIcon from '../../data/images/VideoIcon.svg';
import QuestionnaireIcon from '../../data/images/QuestionnaireIcon.svg';
import CheckMark from '../../data/images/CheckMark.svg';
import Blob1 from '../../data/images/Blob1.svg';
import Blob2 from '../../data/images/Blob2.svg';
import Blob3 from '../../data/images/Blob3.svg';

import './ProgressBar.css';
type StepProps = {
    content: Record<string, string>;
    stepNumber: number | string;
    children?: React.ReactNode;
    completed: boolean;
};
function Step(props: StepProps) { 
    const {
        completed,
        content,
        stepNumber,
        children,
    } = props;
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
}
type ProgressBarProps = {
    content: {
        progressBarHeader?: React.ReactNode;
    } & Record<string, string>;
    step: number;
};
export function ProgressBar(props: ProgressBarProps) {
    const {
        content, 
        step,
    } = props;

    return (
        <div className="progressBar">
            <div className="title">{content.progressBarHeader}</div>
            <div className="stepsGrid">
                <Step
                    content={content}
                    stepNumber={'1'}
                    completed={step >= 1}
                >
                    <Blob1 className="blob blob1" />
                    <VideoIcon className="stepSVG" height="32px" width="32px" />
                </Step>
                <Step
                    content={content}
                    stepNumber={'2'}
                    completed={step >= 2}
                >
                    <Blob2 className="blob blob2" />
                    <QuestionnaireIcon
                        className="stepSVG"
                        height="32px"
                        width="32px" />
                </Step>
                <Step
                    content={content}
                    stepNumber={'3'}
                    completed={step >= 3}
                >
                    <Blob3 className="blob blob3" />
                    <CheckMark className="stepSVG" height="32px" width="32px" />
                </Step>
            </div>
            <div className="linesGridContainer">
                <div className="linesGrid">
                    <div
                        className={`progressLine1 ${step >= 2 ? '' : 'incomplete'}`}
                    ></div>
                    <div
                        className={`progressLine2 ${step >= 3 ? '' : 'incomplete'}`}
                    ></div>
                </div>
            </div>
        </div>
    );
}
