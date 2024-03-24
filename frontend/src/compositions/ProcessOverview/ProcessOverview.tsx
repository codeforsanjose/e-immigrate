import React from 'react';
import VideoIcon from '../../data/images/VideoIcon.svg';
import QuestionnaireIcon from '../../data/images/QuestionnaireIcon.svg';
import CheckMark from '../../data/images/CheckMark.svg';
import Blob1 from '../../data/images/Blob1.svg';
import Blob2 from '../../data/images/Blob2.svg';
import Blob3 from '../../data/images/Blob3.svg';
import Arrow from '../../data/images/Arrow.svg';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

import './ProcessOverview.css';
import { useContentContext } from '../../contexts/ContentContext';
type ValidStepNumbers = 
| 1 
| 2 
| 3
;
type StepProps = {
    stepNumber: ValidStepNumbers;
    children?: React.ReactNode;
};
function Step(props: StepProps) {
    const { content } = useContentContext();
    const { stepNumber, children } = props;
    const step = `step${stepNumber}Header` as const;
    const title = `step${stepNumber}Title` as const;
    const instructions = `step${stepNumber}Instructions` as const;
    return (
        <div className="stepContainer">
            <div className="stepNumber">{content[step]}</div>
            <div className="stepIcon">{children}</div>
            <div className="stepTitle">{content[title]}</div>
            <div className="stepDescription">{content[instructions]}</div>
        </div>
    );
}

export function ProcessOverview() {
    const { content } = useContentContext();
    const navigate = useNavigate();
    const goToStep1 = () => {
        navigate('/video');
    };
    return (
        <div className="ProcessOverview">
            <div className="welcome-message">
                <h1>{content.stepsHeader}</h1>
                <div className="line2">{content.stepsHeader2}</div>
                <div className="line3">{content.stepsHeader3}</div>
            </div>
            <div className="gridContainer">
                <div className="stepsGrid">
                    <Step stepNumber={1}>
                        <Blob1 className="blob blob1" />
                        <VideoIcon className="stepSVG" />
                    </Step>
                    <Arrow className="arrow" />
                    <Step stepNumber={2}>
                        <Blob2 className="blob blob2" />
                        <QuestionnaireIcon className="stepSVG" />
                    </Step>
                    <Arrow className="arrow" />
                    <Step stepNumber={3}>
                        <Blob3 className="blob blob3" />
                        <CheckMark className="stepSVG" />
                    </Step>
                </div>
            </div>
            <div className="startButtonContainer">
                <Button
                    label={content.stepsProceedButton}
                    onClick={goToStep1} />
            </div>
        </div>
    );
}

export default ProcessOverview;
