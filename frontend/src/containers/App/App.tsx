import React from 'react';
import { MainContainer } from '../MainContainer/MainContainer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Admin } from '../../compositions/Admin/Admin';
import { AdminDashboard } from '../AdminDashboard/AdminDashboard';
import { EditQuestionnaires } from '../EditQuestionnaires/EditQuestionnaires';
import './App.css';
import { LanguageContext, useInitialLanguageContextStateFactory } from '../../contexts/LanguageContext';
import { ContentContext, useInitialContentContextStateFactory } from '../../contexts/ContentContext';

export function App() {
    const languageContextState = useInitialLanguageContextStateFactory();
    const contentContextState = useInitialContentContextStateFactory(languageContextState);
    return (
        <LanguageContext.Provider value={languageContextState}>
            <ContentContext.Provider value={contentContextState}>
                <Router>
                    <div className="App">
                        <Routes>
                            <Route path="/dashboard" element={
                                <AdminDashboard />}
                            />
                            <Route path="/login" element={
                                <Admin />
                            }/>
                            <Route path="/questionnaires" element={
                                <EditQuestionnaires />
                            }/>
                            <Route path="/*" element={
                                <MainContainer />}
                            />
                        </Routes>
                    </div>
                </Router>
            </ContentContext.Provider>
        </LanguageContext.Provider>
    );
}
