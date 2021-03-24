import React from 'react';
import ciitLogo from '../../data/images/CiiT Logo.png';
import ceticpLogo from '../../data/images/CET-ICP Logo.png';
import './Footer.css';

const Footer = ({ content }) => {
    return (
        <div className="footer">
            <div className="imgRow">
                <img className="ciitLogo" src={ciitLogo} alt="CiiT Logo" />
                <img
                    className="ceticpLogo"
                    src={ceticpLogo}
                    alt="CET-ICP Logo"
                />
            </div>
            <div className="textRow1">{content.footerText1}</div>
            <div className="textRow2">{content.footerText2}</div>
        </div>
    );
};

export default Footer;
