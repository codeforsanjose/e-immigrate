import React, { useEffect } from 'react';
import MainContainer from '../MainContainer/MainContainer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from '../../components/auth/Admin';
import UsersInfo from '../../components/UsersInfo/UsersInfo';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/users">
                        <UsersInfo />
                    </Route>
                    <Route path="/login">
                        <Admin />
                    </Route>
                    <Route path="/">
                        <MainContainer />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
