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
import ProcessOverview from '../../compositions/ProcessOverview/ProcessOverview';
import { workshopTitle } from '../../data/LanguageOptions';
import { Confirmation } from '../../compositions/Confirmation/Confirmation';

import './MainContainer.css';
import { ProgressBar } from '../../compositions/ProgressBar/ProgressBar';
import { apis } from '../../sendRequest/apis';


import { apiUrlFormatters } from '../../sendRequest/apiUrlFormatters';
import { ContentText } from '../../types/ContentText';
import { useContentContext } from '../../contexts/ContentContext';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { QuestionnaireResponse, QuestionnaireResponseContent, useInitialQuestionnaireResponseContentStateFactory } from '../../contexts/QuestionnaireResponseContext';
import { QuestionsContext, useInitialQuestionsContextStateFactory } from '../../contexts/QuestionsContext';


type GetTranslatedQuestionForLanguageApiResponse = {
    title?: string;
    language?: string;
    content: ContentText;
};



export function MainContainer() {
    const { language } = useLanguageContext();
    const { 
        setContent,
    } = useContentContext();
    const questionsContextState = useInitialQuestionsContextStateFactory();


   
    const [showLanguageSelectionModal, setShowLanguageSelectionModal] = React.useState(language == null || language === '');


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [step, setStep] = React.useState(0);


    const [videoState, setVideoState] = React.useState({ hasWatchedVideo: false });
   
    const questionnaireResponseContext = useInitialQuestionnaireResponseContentStateFactory();
    const changeStep = React.useCallback((callback: (current: number) => number) => {
        setStep(current => {
            const nextStep = callback(current);
            return nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep;
        });
    }, []);
    
    const nextStep = React.useCallback(() => {
        changeStep(step => step + 1);
    }, [changeStep]);

    const navigate = useNavigate();
    

    React.useEffect(() => {
        if (language != null && language !== '') {
            setShowLanguageSelectionModal(false);
        }
        
    }, [language]);

    const videoEndedHandler = React.useCallback(() => {
        setVideoState({
            hasWatchedVideo: true,
        });
        nextStep();
    }, [nextStep]);

    

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

    const submitQuestionnaireResponse = React.useCallback(async (userAnswers: QuestionnaireResponse) => {
        const requestObj = {
            url: apis.addQuestionnaireResponse,
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
   
    
    return (
        <QuestionnaireResponseContent.Provider value={questionnaireResponseContext}>
            <QuestionsContext.Provider value={questionsContextState}>
                <div className="MainContainer">
                    <div className="wrapper">
                        <LanguageSelectionModal
                            showModal={showLanguageSelectionModal}
                            setShowModal={setShowLanguageSelectionModal} />
                        <div className={`items ${showLanguageSelectionModal ? 'blur' : ''}`}>
                            <Navbar dashboard={false}/>
                            <div className="main">
                                <div className="section">
                                    <Routes>
                                        <Route path="/" element={<LandingPage />}/>
                                        <Route path="/eligibility" element={<WorkshopScreening />}/>
                                        <Route path="/overview" element={<ProcessOverview />}/>
                                        <Route path="/video" element={<>
                                            <ProgressBar step={1} />
                                            <Video
                                                onEnd={videoEndedHandler}
                                                videoState={videoState}
                                            />
                                        </>}/>
                                            
                                        <Route path="/questionnaire" element={<>
                                            <ProgressBar step={2} />
                                            <Questionnaire
                                                submitQuestionnaireResponse={submitQuestionnaireResponse}
                                            />
                                        </>}/>
                                        <Route path="/confirmation" element={<>
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
            </QuestionsContext.Provider>
        </QuestionnaireResponseContent.Provider>
    );
}
