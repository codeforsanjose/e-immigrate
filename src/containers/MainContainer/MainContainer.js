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

import { getFromStorage, saveToStorage } from '../../utilities/storage_utils';

const MainContainer = () => {
    const questionnaireTitle = 'CIIT_Workshop_Spring_2021';
    const LOCALSTORE_LANGUAGE = getFromStorage('preferredLanguage') || 'en';
    const LOCALSTORE_CONTENT =
        getFromStorage(
            `${questionnaireTitle}-content-${LOCALSTORE_LANGUAGE}`
        ) || {};
    const LOCALSTORE_QUESTIONS =
        getFromStorage(
            `${questionnaireTitle}-questions-${LOCALSTORE_LANGUAGE}`
        ) || [];
    const [language, setLanguage] = useState(LOCALSTORE_LANGUAGE);
    const [showModal, setShowModal] = useState(true);
    const [step, setStep] = useState(0);
    const [videoState, setVideoState] = useState({ hasWatchedVideo: false });
    const { hasWatchedVideo } = videoState;
    const [questions, setQuestions] = useState(LOCALSTORE_QUESTIONS);
    const [questionnaireResponse, setQuestionnaireResponse] = useState({});
    const [content, setContent] = useState(LOCALSTORE_CONTENT);

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
        saveToStorage('preferredLanguage', language);
    };

    const videoEndedHandler = (event) => {
        setVideoState({
            hasWatchedVideo: true,
        });
        nextStep();
    };

    useEffect(() => {
        const requestObj = {
            url: `${getQuestions}/${questionnaireTitle}.${language}`,
        };
        sendRequest(requestObj).then((response) => {
            setQuestions(response.questions);
            saveToStorage(
                `${questionnaireTitle}-questions-${language}`,
                response.questions
            );
        });
    }, [language]);

    useEffect(() => {
        const requestObj = {
            url: `${getTranslatedContent}/${questionnaireTitle}.${language}`,
        };
        sendRequest(requestObj).then((response) => {
            setContent(response.content);
            saveToStorage(
                `${questionnaireTitle}-content-${language}`,
                response.content
            );
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
            // should redirect to thanks page
        });
    };
    const changeStep = (nextStep) => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };
    const nextStep = () => changeStep(step + 1);
    const previousStep = () => changeStep(step - 1);
    console.log('what is content here?', content);
    console.log('video here', videoState);
    const updatedContentForProcessOverview = { ...content, ...videoState };
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
                    <Navbar
                        language={language}
                        setLanguage={changeLanguage}
                        content={content}
                    />
                    <div className="main">
                        <div className="section">
                            <Switch>
                                <Route exact path="/">
                                    <LandingPage content={content} />
                                </Route>
                                <Route path="/eligibility">
                                    <WorkshopScreening
                                        content={content}
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
                                        content={
                                            updatedContentForProcessOverview
                                        }
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
                                        content={content}
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
                                        content={content}
                                    />
                                </Route>
                            </Switch>
                        </div>
                        <Footer content={content} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContainer;
