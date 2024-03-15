import React from 'react';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import image from '../../data/images/CiiT Logo.png';

import './LandingPage.css';

type LandingPageProps = {
    content: {
        homeWelcomeMessage: string;
        homeHeader1: string;
        homeText1: string;
        homeHeader2: string;
        homeText2: string;
        homeText3: string;
        closedMessage: string;
    };
};
export function LandingPage(props: LandingPageProps) {
    const {
        content,
    } = props;
    const navigate = useNavigate();
    const goToStep1 = () => {
        navigate('/eligibility');
    };
    return (
        <div className="LandingPage">
            <h1>{content.homeWelcomeMessage}</h1>
            <div className="content">
                <div>
                    <div className="description">
                        <h2>{content.homeHeader1}</h2>
                        <p>{content.homeText1}</p>
                    </div>
                    <div className="description last">
                        <h2>{content.homeHeader2}</h2>
                        <p>{content.homeText2}</p>
                        <p>{content.homeText3}</p>
                        <h2>
                            <a
                                href="https://www.e-immigrate.info"
                                target="_blank" rel="noreferrer"
                            >
                                www.e-immigrate.info
                            </a>
                        </h2>
                    </div>
                    <h3>{content.closedMessage}</h3>
                    <Button label={'Registration is Closed'} />
                </div>
                <img src={image} alt="CIIT Logo" width="100%" height="auto" />
            </div>
        </div>
    );
}
