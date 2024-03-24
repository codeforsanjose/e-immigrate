import React from 'react';

import './Confirmation.css';
import { useContentContext } from '../../contexts/ContentContext';


export function Confirmation() {
    const { content } = useContentContext();
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
                <a href="https://www.e-immigrate.info/" target="_blank" rel="noreferrer">
                    e-immigrate.info
                </a>
            </p>
        </div>
    );
}
