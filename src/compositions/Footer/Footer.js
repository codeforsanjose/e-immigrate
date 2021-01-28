import React from 'react';
import ciitLogo from '../../data/images/CiiT Logo.png';
import ceticpLogo from '../../data/images/CET-ICP Logo.png';
import './Footer.css';

const Footer = () => {
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
            <div className="textRow1">
                <div>
                    CIIT was designed by the Center for Employment Training -
                </div>
                <div>Immigration & Citizenship Program (CET-ICP)</div>
            </div>
            <div className="textRow2">
                CET-ICP is a 501C3 Nonprofit Organization
            </div>
        </div>
    );
};

export default Footer;
