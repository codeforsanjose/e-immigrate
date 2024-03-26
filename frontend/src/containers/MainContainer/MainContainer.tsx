import React from 'react';

import { LanguageSelectionModal } from '../../compositions/LanguageSelectionModal/LanguageSelectionModal';
import { Navbar } from '../../compositions/Navbar/Navbar';
import { Footer } from '../../compositions/Footer/Footer';
import { LandingPage } from '../../compositions/LandingPage/LandingPage';
import { Video } from '../../compositions/Video/Video';
import { Questionnaire } from '../../compositions/Questionnaire/Questionnaire/Questionnaire';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { sendRequest } from '../../sendRequest/sendRequest';
import { WorkshopScreening } from '../../compositions/WorkshopScreening/WorkshopScreening';
import { ProcessOverview } from '../../compositions/ProcessOverview/ProcessOverview';
import { workshopTitle } from '../../data/LanguageOptions';
import { Confirmation } from '../../compositions/Confirmation/Confirmation';

import './MainContainer.css';
import { ProgressBar } from '../../compositions/ProgressBar/ProgressBar';
import { apiUrls } from '../../sendRequest/apiUrls';


import { apiUrlFormatters } from '../../sendRequest/apiUrlFormatters';
import { ContentText } from '../../types/ContentText';
import { useContentContext } from '../../contexts/ContentContext';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { QuestionnaireResponse } from '../../contexts/QuestionnaireResponseContext';
import { Button } from '../../components/Button/Button';
import { NavigateToEligibilityIfMissing } from '../../compositions/NavigateToMissingStage';
import classNames from 'classnames';


type GetTranslatedQuestionForLanguageApiResponse = {
    title?: string;
    language?: string;
    content: ContentText;
};


function useStepManagement() {
    const [step, setStep] = React.useState(0);
    const changeStep = React.useCallback((callback: (current: number) => number) => {
        setStep(current => {
            const nextStep = callback(current);
            return nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep;
        });
    }, []);
    
    const nextStep = React.useCallback(() => {
        changeStep(step => step + 1);
    }, [changeStep]);
    return {
        step,
        setStep,
        goToNextStep: nextStep,
    };
}

function useLanguageContentRetrieval() {
    const { language } = useLanguageContext();
    const { setContent } = useContentContext();
    React.useEffect(() => {
        async function inner() {
            const requestObj = {
                url: apiUrlFormatters.getTranslatedContentByLanguage({
                    title: workshopTitle,
                    language,
                }),
            };
            const response = await sendRequest<GetTranslatedQuestionForLanguageApiResponse | undefined>(requestObj);
            if (response == null) {
                console.log('response was null', {
                    requestObj,
                });
                return;
            }
            setContent(response.content);
        }
        void inner();
    }, [language, setContent]);
}


function useVideoStuff() {
    const { language } = useLanguageContext();
    const [showLanguageSelectionModal, setShowLanguageSelectionModal] = React.useState(language == null || language === '');
    React.useEffect(() => {
        if (language != null && language !== '') {
            setShowLanguageSelectionModal(false);
        }
        
    }, [language]);
    return {
        showLanguageSelectionModal, 
        setShowLanguageSelectionModal,
    };
}
export function MainContainer() {
    const { language } = useLanguageContext();


   
    const {
        step,
        goToNextStep,
    } = useStepManagement();

    const navigate = useNavigate();

    useLanguageContentRetrieval();


   



    const [videoState, setVideoState] = React.useState({ hasWatchedVideo: false });
    const videoEndedHandler = React.useCallback(() => {
        setVideoState({
            hasWatchedVideo: true,
        });
        goToNextStep();
    }, [goToNextStep]);

    
    const {
        showLanguageSelectionModal,
        setShowLanguageSelectionModal,
    } = useVideoStuff();
  

    const submitQuestionnaireResponse = React.useCallback(async (userAnswers: QuestionnaireResponse) => {
        const requestObj = {
            url: apiUrls.addQuestionnaireResponse,
            method: 'POST',
            body: JSON.stringify({
                title: workshopTitle,
                language,
                questionnaireResponse: userAnswers,
            }),
        };
        const response = await sendRequest(requestObj);
        console.log('success', response);
        navigate('/confirmation');
    }, [language, navigate]);
    React.useEffect(() => {
        console.log(`Current step: ${step}`);
    }, [step]);
    
    return (
        <div className="MainContainer">
            <div className="wrapper">
                <LanguageSelectionModal
                    showModal={showLanguageSelectionModal}
                    setShowModal={setShowLanguageSelectionModal} />
                <div className={classNames('items', {
                    blur: showLanguageSelectionModal,
                })}>
                    <Navbar dashboard={false}/>
                    <div className="main">
                        <div className="section">

                            <Routes>
                                <Route path="/" element={<LandingPage />}/>
                                <Route path="/eligibility" element={<WorkshopScreening />}/>
                                <Route path="/overview" element={<ProcessOverview />}/>
                                <Route path="/video" element={<>
                                    <ProgressBar step={1} />
                                    <NavigateToEligibilityIfMissing />
                                    <Button
                                        label='Skip video'
                                        onClick={videoEndedHandler}
                                    />
                                    <Video
                                        onEnd={videoEndedHandler}
                                        videoState={videoState}
                                    />
                                </>}/>
                                    
                                <Route path="/questionnaire" element={<>
                                    <ProgressBar step={2} />
                                    <NavigateToEligibilityIfMissing />
                                    <Questionnaire
                                        submitQuestionnaireResponse={submitQuestionnaireResponse}
                                    />
                                </>}/>
                                <Route path="/confirmation" element={<>
                                    <NavigateToEligibilityIfMissing />
                                    <ProgressBar step={3} />
                                    <Confirmation />
                                </>}/>
                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
