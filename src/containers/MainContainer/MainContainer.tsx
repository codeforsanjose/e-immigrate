import React from 'react';

import { LanguageSelectionModal } from '../../compositions/LanguageSelectionModal/LanguageSelectionModal';
import { Navbar } from '../../compositions/Navbar/Navbar';
import { Footer } from '../../compositions/Footer/Footer';
import { LandingPage } from '../../compositions/LandingPage/LandingPage';
import { Video } from '../../compositions/Video/Video';
import { Questionnaire, QuestionnaireResponse } from '../../compositions/Questionnaire/Questionnaire/Questionnaire';
import { Switch, Route, useHistory } from 'react-router-dom';
import { sendRequest } from '../../sendRequest/sendRequest';
import { WorkshopScreening } from '../../compositions/WorkshopScreening/WorkshopScreening';
import ProcessOverview from '../../compositions/ProcessOverview/ProcessOverview';
import { workshopTitle } from '../../data/LanguageOptions';
import { Confirmation } from '../../compositions/Confirmation/Confirmation';

import './MainContainer.css';
import { ProgressBar } from '../../compositions/ProgressBar/ProgressBar';
import { apis } from '../../sendRequest/apis';
const {
    addQuestionnaireResponse,
    getQuestions,
    getTranslatedContent,
} = apis;
import { getFromStorage, saveToStorage } from '../../utilities/storage_utils';
import { CollectAnswerFunction } from '../../types/common';
type GetQuestionsByLanguageElement = {
    id: string;
    text: string;
};
type GetQuestionForLanguageApiResponse = {
    questions: Array<GetQuestionsByLanguageElement>;
};
type GetTranslatedQuestionForLanguageApiResponse = {
    content: string;
};
function tryGetNavigatorUserLanguage() {
    if ('userLanguage' in window.navigator) {
        if (typeof (window.navigator.userLanguage) === 'string') return window.navigator.userLanguage;
    }
}
function getNavigatorLanguage(): string {
    const userLanguage = tryGetNavigatorUserLanguage();
    if (userLanguage == null || userLanguage === '') return window.navigator.language;
    return userLanguage;
}
function MainContainer() {
    const LOCALSTORE_LANGUAGE = getFromStorage('preferredLanguage') || 'en';
    const LOCALSTORE_CONTENT = getFromStorage(`${workshopTitle}-content-${LOCALSTORE_LANGUAGE}`) || {};
    const LOCALSTORE_QUESTIONS = getFromStorage(`${workshopTitle}-questions-${LOCALSTORE_LANGUAGE}`) ||
        [];
    const [language, setLanguage] = React.useState(LOCALSTORE_LANGUAGE);
    const [showModal, setShowModal] = React.useState(true);
    const [step, setStep] = React.useState(0);
    const [videoState, setVideoState] = React.useState({ hasWatchedVideo: false });
    const { hasWatchedVideo } = videoState;
    const [questions, setQuestions] = React.useState(LOCALSTORE_QUESTIONS);
    const [questionnaireResponse, setQuestionnaireResponse] = React.useState<QuestionnaireResponse>({
        languageCode: language,
    });
    const [content, setContent] = React.useState(LOCALSTORE_CONTENT);

    let history = useHistory();
    const browserLanguage = getNavigatorLanguage();

    React.useEffect(() => {
        const locallyStoredLanguage = localStorage.getItem('preferredLanguage');
        if (locallyStoredLanguage) {
            setLanguage(locallyStoredLanguage.slice(1, -1));
            setShowModal(false);
        } else {
            setLanguage(browserLanguage.split('-')[0]);
        }
    }, [browserLanguage]);

    const changeLanguage = (language: string) => {
        setLanguage(language);
        saveToStorage('preferredLanguage', language);
        questionnaireResponse.languageCode = language;
    };

    const videoEndedHandler = () => {
        setVideoState({
            hasWatchedVideo: true,
        });
        nextStep();
    };

    React.useEffect(() => {
        const requestObj = {
            url: `${getQuestions}/${workshopTitle}.${language}`,
        };
        sendRequest<GetQuestionForLanguageApiResponse>(requestObj).then((response) => {
            setQuestions(response.questions);
            saveToStorage(
                `${workshopTitle}-questions-${language}`,
                response.questions
            );
        });
    }, [language]);

    React.useEffect(() => {
        const requestObj = {
            url: `${getTranslatedContent}/${workshopTitle}.${language}`,
        };
        sendRequest<GetTranslatedQuestionForLanguageApiResponse>(requestObj).then((response) => {
            setContent(response.content);
            saveToStorage(
                `${workshopTitle}-content-${language}`,
                response.content
            );
        });
    }, [language]);

    const submitQuestionnaireResponse = (userAnswers: QuestionnaireResponse) => {
        const requestObj = {
            url: addQuestionnaireResponse,
            method: 'POST',
            body: JSON.stringify({
                title: workshopTitle,
                language: language,
                questionnaireResponse: userAnswers,
            }),
        };
        sendRequest(requestObj).then((response) => {
            console.log('success', response);
            history.push('/confirmation');
        });
    };
    const changeStep = (nextStep: number) => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };
    const nextStep = () => changeStep(step + 1);
    const previousStep = () => changeStep(step - 1);
    const updatedContentForProcessOverview = { ...content, ...videoState };
    const collectAnswer: CollectAnswerFunction = (slug: string, answer: unknown) => {
        // const answeredQuestion = Object.assign({}, questionnaireResponse);
        const answeredQuestion = {
            ...questionnaireResponse,
            [slug]: answer,
        }
        // answeredQuestion[slug] = answer;
        setQuestionnaireResponse(answeredQuestion);
    };
    return (
        <div className="MainContainer">
            <div className="wrapper">
                <LanguageSelectionModal
                    language={language}
                    setLanguage={changeLanguage}
                    showModal={showModal}
                    setShowModal={setShowModal} />
                <div className={`items ${showModal ? 'blur' : ''}`}>
                    <Navbar
                        language={language}
                        setLanguage={changeLanguage}
                        content={content}
                        dashboard={false} />
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
                                        // questionnaireResponse={questionnaireResponse}
                                        // setQuestionnaireResponse={setQuestionnaireResponse}
                                        collectAnswer={collectAnswer} />
                                </Route>
                                <Route path="/overview">
                                    <ProcessOverview
                                        content={updatedContentForProcessOverview}
                                        // nextStep={nextStep} 
                                    />
                                </Route>
                                <Route path="/video">
                                    <ProgressBar
                                        content={content}
                                        step={1}
                                        // nextStep={nextStep}
                                        // previousStep={previousStep} 
                                    />
                                    <Video
                                        onEnd={videoEndedHandler}
                                        // video={content.step1VideoID}
                                        videoState={videoState}
                                        content={content} />
                                </Route>
                                <Route path="/questionnaire">
                                    <ProgressBar
                                        content={content}
                                        step={2}
                                        // nextStep={nextStep}
                                        // previousStep={previousStep} 
                                    />
                                    <Questionnaire
                                        questions={questions}
                                        submitQuestionnaireResponse={submitQuestionnaireResponse}
                                        questionnaireResponse={questionnaireResponse}
                                        setQuestionnaireResponse={setQuestionnaireResponse}
                                        content={content}
                                        collectAnswer={collectAnswer} />
                                </Route>
                                <Route path="/confirmation">
                                    <ProgressBar
                                        content={content}
                                        step={3}
                                        // nextStep={nextStep}
                                        // previousStep={previousStep} 
                                    />
                                    <Confirmation content={content} />
                                </Route>
                            </Switch>
                        </div>
                        <Footer content={content} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainContainer;
