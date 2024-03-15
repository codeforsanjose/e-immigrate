import React from 'react';
import MainContainer from '../MainContainer/MainContainer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Admin } from '../../compositions/Admin/Admin.js';
import { AdminDashboard } from '../AdminDashboard/AdminDashboard';
import { EditQuestionnaires } from '../EditQuestionnaires/EditQuestionnaires';
import './App.css';
// import { uploadQuestinnaires } from '../../sendRequest/apis';

export default function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/dashboard">
                        <AdminDashboard 
                        />
                    </Route>
                    <Route path="/login">
                        <Admin />
                    </Route>
                    <Route path="/questionnaires">
                        <EditQuestionnaires />
                    </Route>
                    <Route path="/">
                        <MainContainer />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}
