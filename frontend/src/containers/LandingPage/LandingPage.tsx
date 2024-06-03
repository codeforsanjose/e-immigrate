import React from 'react';

import './LandingPage.css';
import { Navbar } from '../../compositions/Navbar/Navbar';

export function LandingPage() {

    return (
        <div className="LandingPage">
            <Navbar />
            <h1>This is the landing page</h1>
            {/* <h4 onClick={() => {
                navigateToPage('/learning-center');
            }}>Learning Center</h4>
            <h4 onClick={() => {
                navigateToPage('/mers-reporting');
            }}>MERs Reporting</h4>
            <h4 onClick={() => {
                navigateToPage('/workshop');
            }}>workshops</h4>
            <h4 onClick={() => {
                navigateToPage('/feedback');
            }}>feedback</h4> */}
        </div>
    );
}
