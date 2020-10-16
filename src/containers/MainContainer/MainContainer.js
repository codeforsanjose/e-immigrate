import React, { useState, useEffect } from 'react';
import { content } from '../../data/LanguageContent';

import LanguageSelectionModal from '../../compositions/LanguageSelectionModal/LanguageSelectionModal';
import Navbar from '../../compositions/Navbar/Navbar';
import LandingPage from '../../compositions/LandingPage/LandingPage';
import Video from '../../compositions/Video/Video';
import HubspotForm from '../../compositions/HubspotForm/HubspotForm';
import { Switch, Route } from 'react-router-dom';

import './MainContainer.css';
import ProgressBar from '../../compositions/ProgressBar/ProgressBar';

const MainContainer = () => {
    const [language, setLanguage] = useState('en');
    const [showModal, setShowModal] = useState(true);
    const [step, setStep] = useState(2);
    const [videoState, setVideoState] = useState({ hasWatchedVideo: false });
    const [showModal, setShowModal] = useState(true);
    const { hasWatchedVideo } = videoState;
    const browserLanguage =
        window.navigator.userLanguage || window.navigator.language;
    useEffect(() => {
        setLanguage(browserLanguage.substring(0, 2));
    }, [browserLanguage]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/shell.js';
        document.body.appendChild(script);

        script.addEventListener('load', () => {
            if (window.hbspt) {
                window.hbspt.forms.create({
                    portalId: '8034478',
                    formId: content[language].hubspot,
                    target: `#hubspotForm-en`,
                });
            }
        });
    }, [language]);
    const videoEndedHandler = (event) => {
        setVideoState({
            hasWatchedVideo: true,
        });
        nextStep();
    };

    const changeStep = (nextStep) => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };
    const nextStep = () => changeStep(step + 1);
    const previousStep = () => changeStep(step - 1);

    return (
        <div className="MainContainer">
            <div className="wrapper">
                <LanguageSelectionModal
                    language={language}
                    setLanguage={setLanguage}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
                <div className={`items ${showModal ? 'blur' : ''}`}>
                    <Navbar language={language} setLanguage={setLanguage} />
<<<<<<< HEAD
                    <Switch>
                        <Route exact path="/">
                            <LandingPage
                                content={content[language]}
                                nextStep={nextStep}
                            />
                        </Route>
                        <Route path="/video">
                            <ProgressBar
                                content={content[language]}
                                step={step}
                            />
                            <Video
                                onEnd={videoEndedHandler}
                                video={content[language].video}
                            />
                        </Route>
                        <Route path="/questionnaire">
                            <HubspotForm
                                hubspot={content[language].hubspot}
                                hasWatchedVideo={hasWatchedVideo}
                                language={language}
                            />
                        </Route>
                    </Switch>
=======
                    <LandingPage content={content[language]} />
                    <Video
                        onEnd={videoEndedHandler}
                        video={content[language].video}
                    />
                    <HubspotForm
                        hubspot={content[language].hubspot}
                        hasWatchedVideo={hasWatchedVideo}
                        language={language}
                    />
>>>>>>> f6a87142ceb5287c9296f778959c162fec7d2306
                </div>
            </div>
        </div>
    );
};

export default MainContainer;
