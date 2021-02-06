import React from 'react';
import Button from '../../components/Button/Button';
import { useHistory } from 'react-router-dom';
import image from '../../data/images/image placeholder.png';

import './LandingPage.css';

const LandingPage = ({ nextStep }) => {
    let history = useHistory();
    const goToStep1 = () => {
        nextStep();
        history.push('/eligibility');
    };
    return (
        <div className="LandingPage">
            <h1>Welcome to the Virtual Citizenship Workshop</h1>
            <div className="content">
                <div>
                    <div className="description">
                        <h2>What is the Virtual Citizenship Workshop?</h2>
                        <p>
                            This workshop is an opportunity to learn more about
                            the process to become a U.S. citizen, verify your
                            elegibility to apply for citizenship, and get
                            connected to free legal assistance.
                        </p>
                    </div>
                    <div className="description last">
                        <h2>Who Can Participate?</h2>
                        <p>
                            Depending on the date that you became a Legal
                            Permanent Resident, you might or might not be able
                            to participate in this workshop.
                        </p>
                        <p>
                            But don't worry, if you can't participate in this
                            workshop, you might be able to participate in future
                            workshops.
                        </p>
                    </div>
                    <div className="startButtonContainer">
                        <Button
                            label={'See If You Can Participate'}
                            onClick={goToStep1}
                        />
                    </div>
                </div>
                <img src={image} alt="placeholder" />
            </div>
        </div>
    );
};

export default LandingPage;
