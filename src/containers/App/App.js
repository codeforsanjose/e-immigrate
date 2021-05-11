import React from 'react';
import MainContainer from '../MainContainer/MainContainer';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <MainContainer />
            </div>
        </Router>
    );
}

export default App;
