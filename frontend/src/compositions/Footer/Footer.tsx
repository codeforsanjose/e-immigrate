import React from 'react';
import ciitLogo from '../../data/images/CiiT Logo.png';
import ceticpLogo from '../../data/images/CET-ICP Logo.png';
import './Footer.css';
import { ContentText } from '../../types/ContentText';

type FooterContent = Pick<ContentText, 'footerText1' | 'footerText2'>;
type FooterProps = {
    content: FooterContent;
};
export function Footer(props: FooterProps) {
    const { content = { footerText1: '', footerText2: '' } } = props;
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
