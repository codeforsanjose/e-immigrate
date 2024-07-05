import React from 'react';

import './style.css';
import { Navbar } from '../../compositions/Navbar/Navbar';
import englishFreeSource from '../../data/images/eng-free-to-low-cost-immigration-legal-help-in-santa-clara-county-1.jpg';
import spanishFreeSource from '../../data/images/spa-free-to-low-cost-immigration-legal-help-in-santa-clara-county-9-span-no-link-1.jpg';
import vietFreeSource from '../../data/images/viet-free-to-low-cost-immigration-legal-help-in-santa-clara-county-13_0-1.jpg';

export function Resources() {

    return (
        <div className="Resources">
            <Navbar />
            <div className='resourcesDetails'>
                <h2>Eimmigrate resources</h2>
                <div>
                    <h3>Free to Low-Cost Immigration Legal Help in Santa Clara County</h3>
                </div>
                <div>
                    <p>
                        Information below is provided by the Office of Immigrant Relations of Santa Clara County. The referral list contains free to low-cost immigration legal services for our local immigrant community.
                    </p>
                    <p>Please scroll for English, Spanish, or Vietnamese version.</p>
                    <img src={englishFreeSource} />
                    <img src={spanishFreeSource} />
                    <img src={vietFreeSource} />
                </div>
            </div>

        </div>
    );
}
