import React from 'react';
import ciitLogo from '../../data/images/CiiT Logo.png';
import ceticpLogo from '../../data/images/CET-ICP Logo.png';
import './Footer.css';
import { useContentContext } from '../../contexts/ContentContext';


export function Footer() {
    const { content } = useContentContext();
    const { footerText1, footerText2 } = content;
    return (
        <div className="footer">
            <div className="imgRow">
                <img className="ciitLogo" src={ciitLogo} alt="CiiT Logo" />
                <img
                    className="ceticpLogo"
                    src={ceticpLogo}
                    alt="CET-ICP Logo" />
            </div>
            <div className="textRow1">{footerText1}</div>
            <div className="textRow2">{footerText2}</div>
        </div>
    );
}
