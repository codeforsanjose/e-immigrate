import React from 'react';
import Logo from '../../data/images/CiiT logo 1.png';
import LanguageDropdown from '../../components/LanguageDropdown/LanguageDropdown';
import { content } from '../../data/LanguageContent';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ language, setLanguage }) => {
    return (
        <div className="Navbar">
            <img src={Logo} className="logo" alt="CIIT Logo" />
            {/* <h1 className="projectTitle">{content[language].projectTitle}</h1> */}
            <div className="NavLinks">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <LanguageDropdown
                    className="languageDropdown"
                    language={language}
                    setLanguage={setLanguage}
                />
            </div>
        </div>
    );
};

export default Navbar;
