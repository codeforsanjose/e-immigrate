import React, { useState, useEffect } from 'react';
// import { content } from '../../data/LanguageContent';

import LanguageSelectionModal from '../../compositions/LanguageSelectionModal/LanguageSelectionModal';
import Navbar from '../../compositions/Navbar/Navbar';
import Footer from '../../compositions/Footer/Footer';
import LandingPage from '../../compositions/LandingPage/LandingPage';
import Video from '../../compositions/Video/Video';
import Questionnaire from '../../compositions/Questionnaire/Questionnaire/Questionnaire';
import { Switch, Route } from 'react-router-dom';
import { sendRequest } from '../../sendRequest/sendRequest';
import WorkshopScreening from '../../compositions/WorkshopScreening/WorkshopScreening';
import ProcessOverview from '../../compositions/ProcessOverview/ProcessOverview';

import './MainContainer.css';
import ProgressBar from '../../compositions/ProgressBar/ProgressBar';
import {
    addQuestionnaireResponse,
    getQuestions,
    getTranslatedContent,
} from '../../sendRequest/apis';

const MainContainer = () => {
    const [language, setLanguage] = useState('en');
    const [showModal, setShowModal] = useState(true);
    const [step, setStep] = useState(0);
    const [videoState, setVideoState] = useState({ hasWatchedVideo: false });
    const { hasWatchedVideo } = videoState;
    const [questions, setQuestions] = useState({});
    const [questionnaireResponse, setQuestionnaireResponse] = useState({});
    const [content, setContent] = useState({});

    const browserLanguage =
        window.navigator.userLanguage || window.navigator.language;

    useEffect(() => {
        setLanguage(browserLanguage.substring(0, 2));
        const locallyStoredLanguage = localStorage.getItem('preferredLanguage');
        if (locallyStoredLanguage) {
            setLanguage(locallyStoredLanguage);
            setShowModal(false);
        }
    }, [browserLanguage]);

    const changeLanguage = (language) => {
        setLanguage(language);
        localStorage.setItem('preferredLanguage', language);
    };

    const videoEndedHandler = (event) => {
        setVideoState({
            hasWatchedVideo: true,
        });
        nextStep();
    };

    useEffect(() => {
        const requestObj = {
            url: `${getQuestions}/CIIT_Workshop_Spring_2021.${language}`,
        };
        sendRequest(requestObj).then((response) => {
            setQuestions(response.questions);
        });
    }, [language]);

    useEffect(() => {
        const requestObj = {
            url: `${getTranslatedContent}/CIIT_Workshop_Spring_2021.${language}`,
        };
        sendRequest(requestObj).then((response) => {
            console.log('response.content :>> ', response.content);
            setContent(response.content);
        });
    }, [language]);

    const submitQuestionnaireResponse = (userAnswers) => {
        const requestObj = {
            url: addQuestionnaireResponse,
            method: 'POST',
            body: JSON.stringify({
                title: 'test resonse for this questionnaire',
                questionnaireResponse: userAnswers,
            }),
        };
        sendRequest(requestObj).then((response) => {
            console.log('success', response);
        });
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
                    setLanguage={changeLanguage}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
                <div className={`items ${showModal ? 'blur' : ''}`}>
                    <Navbar language={language} setLanguage={changeLanguage} />
                    <div className="main">
                        <div className="section">
                            <Switch>
                                <Route exact path="/">
                                    <LandingPage
                                        content={content}
                                        nextStep={nextStep}
                                    />
                                </Route>
                                <Route path="/eligibility">
                                    <WorkshopScreening
                                        questions={questions}
                                        questionnaireResponse={
                                            questionnaireResponse
                                        }
                                        setQuestionnaireResponse={
                                            setQuestionnaireResponse
                                        }
                                    />
                                </Route>
                                <Route path="/overview">
                                    <ProcessOverview
                                        content={content}
                                        nextStep={nextStep}
                                    />
                                </Route>
                                <Route path="/video">
                                    <ProgressBar
                                        content={content}
                                        step="1"
                                        nextStep={nextStep}
                                        previousStep={previousStep}
                                    />
                                    <Video
                                        onEnd={videoEndedHandler}
                                        video={content.step1VideoID}
                                        videoState={videoState}
                                    />
                                </Route>
                                <Route path="/questionnaire">
                                    <Questionnaire
                                        questions={questions}
                                        submitQuestionnaireResponse={
                                            submitQuestionnaireResponse
                                        }
                                        questionnaireResponse={
                                            questionnaireResponse
                                        }
                                        setQuestionnaireResponse={
                                            setQuestionnaireResponse
                                        }
                                    />
                                </Route>
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContainer;
