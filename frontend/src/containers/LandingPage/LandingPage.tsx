import React from 'react';

import './LandingPage.css';
import { Navbar } from '../../compositions/Navbar/Navbar';

import image from '../../data/images/eimmigrateBackground.png';
import { StatementDetails } from '../../compositions/StatementsDetails';

export function LandingPage() {

    return (
        <div className="LandingPage">
            <Navbar />
            <article className='pageDetails'>
                <h1>E-Immigrate</h1>
                <StatementDetails />
                <h2>Project New Citizen</h2>
                <img src={image} />
                <article className='pastEventsDetails'>
                    <hr />
                    <h2>Citizenship Day 2024</h2>
                    <section className='letterDetails'>
                        <h3>This event is now closed. Thank you for your interest in Citizenship Day 2024.</h3>
                        <p>Thank you for your cooperation, patience, and understanding.</p>
                        <p>Sincerely,</p>
                        <p>PROJECT NEW CITIZEN</p>
                    </section>
                    <hr />
                </article>
            </article>

        </div>
    );
}
