import React from 'react';
import VideoIcon from '../../data/images/VideoIcon.svg';
import QuestionnaireIcon from '../../data/images/QuestionnaireIcon.svg';
import CheckMark from '../../data/images/CheckMark.svg';
import Blob1 from '../../data/images/Blob1.svg';
import Blob2 from '../../data/images/Blob2.svg';
import Blob3 from '../../data/images/Blob3.svg';

import './ProgressBar.css';
import { useContentContext } from '../../contexts/ContentContext';
import classNames from 'classnames';
import { ValidStepNumbers } from '../../types/ValidStepNumbers';

type StepProps = {
    stepNumber: ValidStepNumbers;
    children?: React.ReactNode;
    completed: boolean;
};
function Step(props: StepProps) { 
    const {
        completed,
        stepNumber,
        children,
    } = props;
    const { content } = useContentContext();
    return (
        <div 
            className={classNames('stepContainer', {
                incomplete: !completed,
            })}
        >
            <div 
                className={classNames('stepNumber', {
                    incomplete: !completed,
                })}
            >
                {content[`step${stepNumber}Header`]}
            </div>
            <div 
                className={classNames('stepTitle', {
                    incomplete: !completed,
                })}
            >
                {content[`step${stepNumber}Title`]}
            </div>
            <div 
                className={classNames('stepIcon', {
                    incomplete: !completed,
                })}
            >
                {children}
            </div>
        </div>
    );
}
type ProgressBarProps = {
    step: number;
};
export function ProgressBar(props: ProgressBarProps) {
    const {
        step,
    } = props;
    const { content } = useContentContext();
    console.log('what it suppose to be ', content.progressBarHeader);
    return (
        <div className="progressBar">
            <div className="title">{content.progressBarHeader}</div>
            <div className="stepsGrid">
                <Step
                    stepNumber={1}
                    completed={step >= 1}
                >
                    <Blob1 className="blob blob1" />
                    <VideoIcon className="stepSVG" height="32px" width="32px" />
                </Step>
                <Step
                    stepNumber={2}
                    completed={step >= 2}
                >
                    <Blob2 className="blob blob2" />
                    <QuestionnaireIcon
                        className="stepSVG"
                        height="32px"
                        width="32px" />
                </Step>
                <Step
                    stepNumber={3}
                    completed={step >= 3}
                >
                    <Blob3 className="blob blob3" />
                    <CheckMark className="stepSVG" height="32px" width="32px" />
                </Step>
            </div>
            <div className="linesGridContainer">
                <div className="linesGrid">
                    <div
                        className={classNames('progressLine1', {
                            incomplete: !(step >= 2),
                        })}
                    ></div>
                    <div
                        className={classNames('progressLine2', {
                            incomplete: !(step >= 3),
                        })}
                    ></div>
                </div>
            </div>
        </div>
    );
}
