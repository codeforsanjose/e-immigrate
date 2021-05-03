import React from 'react';
import Logo from '../../data/images/CiiT Logo.png';
import LanguageDropdown from '../../components/LanguageDropdown/LanguageDropdown';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ language, setLanguage, content, dashboard }) => {
    return (
        <div className="Navbar">
            <Link to="/">
                <img src={Logo} className="logo" alt="CIIT Logo" />
            </Link>
            <div className="NavLinks">
                {!dashboard && (
                    <LanguageDropdown
                        className="languageDropdown"
                        language={language}
                        setLanguage={setLanguage}
                    />
                )}
            </div>
        </div>
    );
};

export default Navbar;
