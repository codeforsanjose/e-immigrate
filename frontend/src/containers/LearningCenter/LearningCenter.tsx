import React from 'react';

import './LearningCenter.css';
import { Navbar } from '../../compositions/Navbar/Navbar';

export function LearningCenter() {
    return (
        <div className="LearningCenter">
            <Navbar />
            <h1>This is the LearningCenter page</h1>
        </div>
    );
}
