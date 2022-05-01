import React from 'react';
import Button from '../../components/Button/Button';
import { useHistory } from 'react-router-dom';
import image from '../../data/images/CiiT Logo.png';

import './LandingPage.css';

const LandingPage = ({ content }) => {
    let history = useHistory();
    const goToStep1 = () => {
        history.push('/eligibility');
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
                            <a href="www.e-immigrate.info" target="_blank">
                                www.e-immigrate.info
                            </a>
                        </h2>
                    </div>
                    <Button onClick={goToStep1} label={'Start'} />
                </div>
                <img src={image} alt="CIIT Logo" width="100%" height="auto" />
            </div>
        </div>
    );
};

export default LandingPage;
