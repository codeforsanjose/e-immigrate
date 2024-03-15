import React from 'react';
import Logo from '../../data/images/CiiT Logo.png';
import { LanguageDropdown } from '../../components/LanguageDropdown/LanguageDropdown';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { DirectReactSetter } from '../../types/common';
type NavbarProps = {
    language: string;
    setLanguage: DirectReactSetter<string>;
    content: unknown;
    dashboard?: boolean;
};
export function Navbar(props: NavbarProps) {
    const {
        content,
        language,
        setLanguage,
        dashboard,
    } = props;
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
