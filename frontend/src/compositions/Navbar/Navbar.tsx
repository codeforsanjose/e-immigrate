import React from 'react';
import Logo from '../../data/images/CiiT Logo.png';
import { LanguageDropdown } from '../../components/LanguageDropdown/LanguageDropdown';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useLanguageContext } from '../../contexts/LanguageContext';
type NavbarProps = {
    dashboard?: boolean;
};
export function Navbar(props: NavbarProps) {
    const {
        dashboard,
    } = props;
    const {
        language,
        setLanguage,
    } = useLanguageContext();
    return (
        <div className="Navbar">
            <Link to="/">
                <img src={Logo} className="logo" alt="CIIT Logo" />
            </Link>
            <div className="NavLinks">
                {!(dashboard ?? false) && (
                    <LanguageDropdown
                        className="languageDropdown"
                        language={language}
                        setLanguage={setLanguage} />
                )}
            </div>
        </div>
    );
}
