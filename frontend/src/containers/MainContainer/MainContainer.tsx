import React from 'react';

import { LanguageSelectionModal } from '../../compositions/LanguageSelectionModal/LanguageSelectionModal';
import { Navbar } from '../../compositions/Navbar/Navbar';
import { Footer } from '../../compositions/Footer/Footer';
import { LandingPage } from '../../compositions/LandingPage/LandingPage';
import { Video } from '../../compositions/Video/Video';
import { Questionnaire, QuestionnaireResponse } from '../../compositions/Questionnaire/Questionnaire/Questionnaire';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { sendRequest } from '../../sendRequest/sendRequest';
import { WorkshopScreening } from '../../compositions/WorkshopScreening/WorkshopScreening';
import ProcessOverview from '../../compositions/ProcessOverview/ProcessOverview';
import { workshopTitle } from '../../data/LanguageOptions';
import { Confirmation } from '../../compositions/Confirmation/Confirmation';

import './MainContainer.css';
import { ProgressBar } from '../../compositions/ProgressBar/ProgressBar';
import { apis } from '../../sendRequest/apis';
import { getFromStorage, saveToStorage } from '../../utilities/storage_utils';
import { CollectAnswerFunction } from '../../types/common';
import { GetQuestionsByLanguageElement } from '../../types/ApiResults';
const {
    addQuestionnaireResponse,
    getQuestions,
    getTranslatedContent,
} = apis;

type GetQuestionForLanguageApiResponse = {
    questions: Array<GetQuestionsByLanguageElement>;
};
type GetTranslatedQuestionForLanguageApiResponse = {
    title?: string;
    language?: string;
    content: LocalstoreContent;
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
function setupPreferredLanguageStorageWrapper() {
    const key = 'preferredLanguage';
    return {
        tryGet: (): string | undefined => {
            const output = getFromStorage<string>(key);
            if (output == null) return;
            else if (!output.success) {
                console.error('Failed to deserialize the value');
                return;
            }
            return output.value;
        },
        set: (value: string) => {
            saveToStorage(key, value);
        },
    };
}
type LocalstoreContent = {
    footerText1: string;
    footerText2: string;
    homeWelcomeMessage: string;
    homeHeader1: string;
    homeText1: string;
    homeHeader2: string;
    homeText2: string;
    homeText3: string;
    homeProceedButton: string;
    screeningHeader: string;
    screeningHeader2: string;
    errorMessage: string;
    screeningDate: string;
    screeningDateMarried: string;
    modalText1: string;
    modalText2: string;
    modalText3: string;
    modalText4: string;
    modalExitButton: string;
    screeningProceedButton: string;
    stepsHeader: string;
    stepsHeader2: string;
    stepsHeader3: string;
    stepsProceedButton: string;
    step1Header: string;
    step1Title: string;
    step1Instructions: string;
    step1VideoID: string;
    step1Tip1: string;
    step1Tip2: string;
    step1Ending: string;
    step1ProceedButton: string;
    step2Header: string;
    step2Title: string;
    step2Instructions: string;
    step2Tip1: string;
    step2Tip2: string;
    step2Header2: string;
    step2Tip4: string;
    step2Tip5: string;
    step2Tip6: string;
    step2ProceedButton1: string;
    step2ProceedButton2: string;
    step2ProceedButton3: string;
    step2Ending: string;
    step2ProceedButton4: string;
    step3Header: string;
    step3Title: string;
    step3Instructions: string;
    step3Header2: string;
    step3Text2: string;
    step3Header3: string;
    step3Text3: string;
    step3Tip1: string;
    step3Tip2: string;
    step3Tip3: string;
    step3Text4: string;
    step3Text5: string;
    step3Text6: string;
    progressBarHeader: string;
    errorMessageEmail: string;
    errorMessagePhone: string;
    errorMessageZip: string;
    required: string;
    optional: string;
    closedMessage: string;
};
const defaultLocalStoreContent: LocalstoreContent = {
    footerText1: `missing 'footerText1'`,
    footerText2: `missing 'footerText2'`,
    homeWelcomeMessage: `missing 'homeWelcomeMessage'`,
    homeHeader1: `missing 'homeHeader1'`,
    homeText1: `missing 'homeText1'`,
    homeHeader2: `missing 'homeHeader2'`,
    homeText2: `missing 'homeText2'`,
    homeText3: `missing 'homeText3'`,
    homeProceedButton: `missing 'homeProceedButton'`,
    screeningHeader: `missing 'screeningHeader'`,
    screeningHeader2: `missing 'screeningHeader2'`,
    errorMessage: `missing 'errorMessage'`,
    screeningDate: `missing 'screeningDate'`,
    screeningDateMarried: `missing 'screeningDateMarried'`,
    modalText1: `missing 'modalText1'`,
    modalText2: `missing 'modalText2'`,
    modalText3: `missing 'modalText3'`,
    modalText4: `missing 'modalText4'`,
    modalExitButton: `missing 'modalExitButton'`,
    screeningProceedButton: `missing 'screeningProceedButton'`,
    stepsHeader: `missing 'stepsHeader'`,
    stepsHeader2: `missing 'stepsHeader2'`,
    stepsHeader3: `missing 'stepsHeader3'`,
    stepsProceedButton: `missing 'stepsProceedButton'`,
    step1Header: `missing 'step1Header'`,
    step1Title: `missing 'step1Title'`,
    step1Instructions: `missing 'step1Instructions'`,
    step1VideoID: `missing 'step1VideoID'`,
    step1Tip1: `missing 'step1Tip1'`,
    step1Tip2: `missing 'step1Tip2'`,
    step1Ending: `missing 'step1Ending'`,
    step1ProceedButton: `missing 'step1ProceedButton'`,
    step2Header: `missing 'step2Header'`,
    step2Title: `missing 'step2Title'`,
    step2Instructions: `missing 'step2Instructions'`,
    step2Tip1: `missing 'step2Tip1'`,
    step2Tip2: `missing 'step2Tip2'`,
    step2Header2: `missing 'step2Header2'`,
    step2Tip4: `missing 'step2Tip4'`,
    step2Tip5: `missing 'step2Tip5'`,
    step2Tip6: `missing 'step2Tip6'`,
    step2ProceedButton1: `missing 'step2ProceedButton1'`,
    step2ProceedButton2: `missing 'step2ProceedButton2'`,
    step2ProceedButton3: `missing 'step2ProceedButton3'`,
    step2Ending: `missing 'step2Ending'`,
    step2ProceedButton4: `missing 'step2ProceedButton4'`,
    step3Header: `missing 'step3Header'`,
    step3Title: `missing 'step3Title'`,
    step3Instructions: `missing 'step3Instructions'`,
    step3Header2: `missing 'step3Header2'`,
    step3Text2: `missing 'step3Text2'`,
    step3Header3: `missing 'step3Header3'`,
    step3Text3: `missing 'step3Text3'`,
    step3Tip1: `missing 'step3Tip1'`,
    step3Tip2: `missing 'step3Tip2'`,
    step3Tip3: `missing 'step3Tip3'`,
    step3Text4: `missing 'step3Text4'`,
    step3Text5: `missing 'step3Text5'`,
    step3Text6: `missing 'step3Text6'`,
    progressBarHeader: `missing 'progressBarHeader'`,
    errorMessageEmail: `missing 'errorMessageEmail'`,
    errorMessagePhone: `missing 'errorMessagePhone'`,
    errorMessageZip: `missing 'errorMessageZip'`,
    required: `missing 'required'`,
    optional: `missing 'optional'`,
    closedMessage: `missing 'closedMessage'`,
};
function setupLocalstoreContentWrapper(language: string) {
    const key = `${workshopTitle}-content-${language}`;
    type Content = LocalstoreContent;
    return {
        tryGet: (): Content | undefined => {
            const output = getFromStorage<Content>(key);
            if (output == null) return;
            else if (!output.success) {
                console.error('Failed to deserialize the value');
                return;
            }
            return output.value;
        },
        set: (value: Content) => {
            saveToStorage(key, value);
        },
    };
}
function setupLocalstoreQuestionsWrapper(language: string) {
    const key = `${workshopTitle}-questions-${language}`;
    type DataType = NonNullable<GetQuestionsByLanguageElement>;
    return {
        tryGet: (): Array<DataType> | undefined => {
            // getFromStorage(`${workshopTitle}-content-${LOCALSTORE_LANGUAGE}`) || {}
            const output = getFromStorage<Array<DataType>>(key);
            if (output == null) return;
            else if (!output.success) {
                console.error('Failed to deserialize the value');
                return;
            }
            return output.value.filter(x => x != null);
        },
        set: (value: Array<DataType>) => {
            saveToStorage(key, value);
        },
    };
}
const preferredLanguageStorageWrapper = setupPreferredLanguageStorageWrapper();

export function MainContainer() {
    const LOCALSTORE_LANGUAGE = preferredLanguageStorageWrapper.tryGet() ?? 'en';
    const localStoreContentWrapper = React.useMemo(() => {
        return setupLocalstoreContentWrapper(LOCALSTORE_LANGUAGE);
    }, [LOCALSTORE_LANGUAGE]);
    const localStoreQuestionsWrapper = React.useMemo(() => {
        return setupLocalstoreQuestionsWrapper(LOCALSTORE_LANGUAGE);
    }, [LOCALSTORE_LANGUAGE]);
    const LOCALSTORE_CONTENT = localStoreContentWrapper.tryGet() ?? {
        ...defaultLocalStoreContent,
    };
    const LOCALSTORE_QUESTIONS = localStoreQuestionsWrapper.tryGet() ?? [];

    const [language, setLanguage] = React.useState(LOCALSTORE_LANGUAGE);
    const [showModal, setShowModal] = React.useState(true);
    const [step, setStep] = React.useState(0);
    const [videoState, setVideoState] = React.useState({ hasWatchedVideo: false });
    // const { hasWatchedVideo } = videoState;
    const [questions, setQuestions] = React.useState(LOCALSTORE_QUESTIONS);
    const [questionnaireResponse, setQuestionnaireResponse] = React.useState<QuestionnaireResponse>({
        languageCode: language,
    });
    const [content, setContent] = React.useState(LOCALSTORE_CONTENT);

    const navigate = useNavigate();
    const browserLanguage = getNavigatorLanguage();

    React.useEffect(() => {
        const locallyStoredLanguage = preferredLanguageStorageWrapper.tryGet();
        if (locallyStoredLanguage != null) {
            setLanguage(locallyStoredLanguage.slice(1, -1));
            setShowModal(false);
        } 
        else {
            setLanguage(browserLanguage.split('-')[0]);
        }
    }, [browserLanguage]);

    const changeLanguage = (language: string) => {
        setLanguage(language);
        preferredLanguageStorageWrapper.set(language);
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
                response.questions,
            );
        });
    }, [language]);

    React.useEffect(() => {
        const requestObj = {
            url: `${getTranslatedContent}/${workshopTitle}.${language}`,
        };
        sendRequest<GetTranslatedQuestionForLanguageApiResponse>(requestObj).then((response) => {
            setContent(response.content);
            localStoreContentWrapper.set(response.content);
            // saveToStorage(
            //     `${workshopTitle}-content-${language}`,
            //     response.content,
            // );
        });
    }, [language, localStoreContentWrapper]);

    const submitQuestionnaireResponse = (userAnswers: QuestionnaireResponse) => {
        const requestObj = {
            url: addQuestionnaireResponse,
            method: 'POST',
            body: JSON.stringify({
                title: workshopTitle,
                language,
                questionnaireResponse: userAnswers,
            }),
        };
        sendRequest(requestObj).then((response) => {
            console.log('success', response);
            navigate('/confirmation');
        });
    };
    function changeStep(nextStep: number) {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    }
    function nextStep() {
        changeStep(step + 1);
    }
    
    const updatedContentForProcessOverview = { ...content, ...videoState };
    const collectAnswer: CollectAnswerFunction = (slug: string, answer: unknown) => {
        // const answeredQuestion = Object.assign({}, questionnaireResponse);
        const answeredQuestion = {
            ...questionnaireResponse,
            [slug]: answer,
        };
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
                        dashboard={false}
                    />
                    <div className="main">
                        <div className="section">
                            <Routes>
                                <Route path="/" element={<LandingPage content={content} />}/>
                                <Route path="/eligibility" element={<WorkshopScreening
                                    content={content}
                                    questions={questions}
                                    // questionnaireResponse={questionnaireResponse}
                                    // setQuestionnaireResponse={setQuestionnaireResponse}
                                    collectAnswer={collectAnswer} />}/>
                                <Route path="/overview" element={<ProcessOverview
                                    content={updatedContentForProcessOverview}
                                    // nextStep={nextStep} 
                                />}/>
                                <Route path="/video" element={<>
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
                                </>}/>
                                    
                                <Route path="/questionnaire" element={<>
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
                                </>}/>
                                <Route path="/confirmation" element={<>
                                    <ProgressBar
                                        content={content}
                                        step={3}
                                        // nextStep={nextStep}
                                        // previousStep={previousStep} 
                                    />
                                    <Confirmation content={content} />
                                </>}/>
                            </Routes>
                        </div>
                        <Footer content={content} />
                    </div>
                </div>
            </div>
        </div>
    );
}
