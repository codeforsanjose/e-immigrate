import React from 'react';

import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
    const navigate = useNavigate();

    function navigateToPage(page: string) {
        navigate(page);
    }
    return (
        <div className="LandingPage">
            <h1>This is the landing page</h1>
            <h4 onClick={() => {
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
            }}>feedback</h4>
        </div>
    );
}
