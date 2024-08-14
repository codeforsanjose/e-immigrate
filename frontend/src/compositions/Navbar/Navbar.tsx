import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../data/images/CiiT Logo.png';
import { LanguageDropdown } from '../../components/LanguageDropdown/LanguageDropdown';

import './Navbar.css';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { getAuthToken } from '../../utilities/auth_utils';
type NavbarProps = {
    dashboard?: boolean;
};
export function Navbar(props: NavbarProps) {
    const {
        dashboard,
    } = props;
    const [showAdminTabs, setShowAdminTabs] = React.useState(false); 
    const navigate = useNavigate();
    React.useEffect(() => {
        async function inner() {
            // setLoading(true);
            const jwt = getAuthToken();
            if (jwt == null) {
                // navigate('/');
                setShowAdminTabs(false);
                return;
            }
            else {
                setShowAdminTabs(true);
            }
        }
        void inner();
    }, [navigate]);
    const {
        language,
        setLanguage,
    } = useLanguageContext();
    const learningCenterText = `Learning Center`;
    const feedbackText = `Feedback`;
    const mersReportingText = `MERS`;
    const loginText = `Login`;
    const workshopText = `Workshops`;
    const resourcesText = 'Resources';
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
                { showAdminTabs && <Link to="/mers-reporting">
                    <h3 className={isActiveTab('mers') ? 'active' : '' }>{mersReportingText}</h3>
                </Link> }
                <Link to="/feedback">
                    <h3 className={isActiveTab('feedback') ? 'active' : '' }>{feedbackText}</h3>
                </Link>
                <Link to="/workshops">
                    <h3 className={isActiveTab('workshops') ? 'active' : '' }>{workshopText}</h3>
                </Link>
                <Link to="/resources">
                    <h3 className={isActiveTab('resources') ? 'active' : '' }>{resourcesText}</h3>
                </Link>
                <Link to='https://projectnewcitizen.com/'>
                    <h3>Project New Citizen Impact</h3>
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
