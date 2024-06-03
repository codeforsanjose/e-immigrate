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
    const learningCenterText = `Learning Center`;
    const feedbackText = `Feedback`;
    const mersReportingText = `MERS`;
    const loginText = `Login`;
    const workshopText = `Workshops`;
    const isActiveTab = (tabName: string) => {
        return window.location.href.includes(tabName);
    };
    return (
        <div className="Navbar">
            <Link to="/">
                <img src={Logo} className="logo" alt="CIIT Logo" />
            </Link>
            <div className="NavLinks">
                <Link to="/learning-center">
                    <h3 className={isActiveTab('learning-center') ? 'active' : '' }>{learningCenterText}</h3>
                </Link>
                <Link to="/mers-reporting">
                    <h3 className={isActiveTab('mers') ? 'active' : '' }>{mersReportingText}</h3>
                </Link>
                <Link to="/feedback">
                    <h3 className={isActiveTab('feedback') ? 'active' : '' }>{feedbackText}</h3>
                </Link>
                <Link to="/workshop">
                    <h3 className={isActiveTab('workshop') ? 'active' : '' }>{workshopText}</h3>
                </Link>
                <Link to="/login">
                    <h3 className={isActiveTab('login') ? 'active' : '' }>{loginText}</h3>
                </Link>

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
