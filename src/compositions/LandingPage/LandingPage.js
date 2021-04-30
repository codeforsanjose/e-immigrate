import React from 'react';
import Button from '../../components/Button/Button';
import { useHistory } from 'react-router-dom';
import image from '../../data/images/image placeholder.png';

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
                    </div>
                    <Button
                        label={content.homeProceedButton}
                        onClick={goToStep1}
                    />
                </div>
                <img src={image} alt="placeholder" />
            </div>
        </div>
    );
};

export default LandingPage;
