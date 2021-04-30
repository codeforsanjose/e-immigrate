import React from 'react';
import Logo from '../../data/images/CiiT Logo.png';
import LanguageDropdown from '../../components/LanguageDropdown/LanguageDropdown';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ language, setLanguage, content }) => {
    return (
        <div className="Navbar">
            <img src={Logo} className="logo" alt="CIIT Logo" />
            <div className="NavLinks">
                <Link to="/">{content.buttonHome}</Link>
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
