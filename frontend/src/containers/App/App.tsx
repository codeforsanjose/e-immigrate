import React from 'react';
import { MainContainer } from '../MainContainer/MainContainer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Admin } from '../../compositions/Admin/Admin';
import { AdminDashboard } from '../AdminDashboard/AdminDashboard';
import { EditQuestionnaires } from '../EditQuestionnaires/EditQuestionnaires';
import './App.css';
import { ContentContextProvider } from '../../contexts/ContentContext';
import { LanguageContextProvider } from '../../contexts/LanguageContext';
import { QuestionContextProvider } from '../../contexts/QuestionsContext';
import { QuestionnaireResponseContextProvider } from '../../contexts/QuestionnaireResponseContext';
import { LandingPage } from '../LandingPage/LandingPage';
import { FeedbackPage } from '../FeedbackPage/FeedbackPage';
import { LearningCenter } from '../LearningCenter/LearningCenter';
import { MERSReportingPage } from '../MERSReportingPage/MERSReportingPage';
import { Resources } from '../Resources';

export function App() {
    return (
        <LanguageContextProvider>
            <ContentContextProvider>
                <QuestionContextProvider>
                    <Router>
                        <div className="App">
                            <Routes>
                                <Route path="/" element={
                                    <LandingPage />}
                                />
                                <Route path="/learning-center" element={
                                    <LearningCenter />}
                                />
                                <Route path="/feedback" element={
                                    <FeedbackPage />}
                                />
                                <Route path="/resources" element={
                                    <Resources />}
                                />
                                <Route path="/dashboard" element={
                                    <AdminDashboard />}
                                />
                                <Route path="/mers-reporting" element={
                                    <QuestionnaireResponseContextProvider>
                                        <MERSReportingPage />
                                    </QuestionnaireResponseContextProvider>
                                }
                                />
                                <Route path="/login" element={
                                    <Admin />
                                } />
                                <Route path="/questionnaires" element={
                                    <EditQuestionnaires />
                                } />
                                <Route path="/*" element={
                                    <QuestionnaireResponseContextProvider>
                                        <MainContainer />
                                    </QuestionnaireResponseContextProvider>
                                } />
                            </Routes>
                        </div>
                    </Router>
                </QuestionContextProvider>
            </ContentContextProvider>
        </LanguageContextProvider>
    );
}
