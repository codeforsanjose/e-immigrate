import React from 'react';
import MainContainer from '../MainContainer/MainContainer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from '../../components/auth/Admin';
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/dashboard">
                        <AdminDashboard />
                    </Route>
                    <Route path="/login">
                        <Admin />
                    </Route>
                    <Route exact path="/">
                        <MainContainer />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
