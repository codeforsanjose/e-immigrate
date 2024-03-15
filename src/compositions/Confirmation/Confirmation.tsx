import React from 'react';

import './Confirmation.css';

type ConfirmationProps = {
    content: {
        step3Header: string;
        step3Title: string;
        step3Header2: string;
        step3Text2: string;
        step3Header3: string;
        step3Text3: string;
        step3Tip1: string;
        step3Tip2: string;
        step3Tip3: string;
        step3Text4: string;
        step3Text5: string;
        step3Text6: string;
    };
};
export function Confirmation(props: ConfirmationProps) {
    const {
        content,
    } = props;
    return (
        <div className="Confirmation">
            <div>
                <h1>
                    {content.step3Header}: {content.step3Title}
                </h1>
                <h2>{content.step3Header2}</h2>
                <p>{content.step3Text2}</p>
            </div>
            <div>
                <h1>{content.step3Header3}</h1>
                <h2>{content.step3Text3}</h2>
                <ul>
                    <li>{content.step3Tip1}</li>
                    <li>{content.step3Tip2}</li>
                    <li>{content.step3Tip3}</li>
                </ul>
            </div>
            <div>
                <h2>{content.step3Text4}</h2>
            </div>
            <p>{content.step3Text5}</p>
            <p>
                {content.step3Text6}{' '}
                <a href="https://www.e-immigrate.info/" target="_blank">
                    e-immigrate.info
                </a>
            </p>
        </div>
    );
}
