import React from 'react';
import Logo from '../../data/images/ProjectNewCitizenLogo.png';
import LanguageDropdown from '../../components/LanguageDropdown/LanguageDropdown';
import { content } from '../../data/LanguageContent';

import './Navbar.css';

const Navbar = ({ language, setLanguage }) => {
    return (
        <div className="Navbar">
            <img src={Logo} className="logo" alt="CIIT Logo" />
            <h1 className="projectTitle">{content[language].projectTitle}</h1>
            <LanguageDropdown language={language} setLanguage={setLanguage} />
        </div>
    );
};

export default Navbar;
