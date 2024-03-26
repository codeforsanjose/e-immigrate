import React from 'react';
import { Button } from '../../../components/Button/Button';

import './QuestionnaireIntro.css';
import { useContentContext } from '../../../contexts/ContentContext';

type QuestionnaireIntroProps = {
    setIntroPage: (value: boolean) => void;
};
export function QuestionnaireIntro(props: QuestionnaireIntroProps) {
    const {
        setIntroPage,
    } = props;
    const { content } = useContentContext();
    const onClick = () => {
        setIntroPage(false);
    };

    return (
        <div className="QuestionnaireIntro">
            <div>
                <h1>
                    {content.step2Header}: {content.step2Title}
                </h1>
                <h2>{content.step2Instructions}</h2>
                <ul>
                    <li>{content.step2Tip1}</li>
                    <li>{content.step2Tip2}</li>
                </ul>
            </div>
            <div>
                <h1 className="header2">{content.step2Header2}</h1>
                <ul>
                    <li>{content.step2Tip4}</li>
                    <li>{content.step2Tip5}</li>
                    <li>{content.step2Tip6}</li>
                </ul>
            </div>
            <div className="ButtonContainer">
                <Button label={content.step2ProceedButton1} onClick={onClick} />
            </div>
        </div>
    );
}
