import React from 'react';

import './style.css';

export function StatementDetails() {

    return (
        <div className="StatementDetails">
            <article className='statementContainer'>
                <h2>Our Mission</h2>
                <p>Our mission is to aggregate dependable and trustworthy services, tools, trending news and resources for the needs of US residents seeking lawful permanent residency or citizenship.</p>
            </article>
            <article className='statementContainer'>
                <h2>Our Commitment</h2>
                <p>We’re committed to building and maintaining a free digital portal with comprehensive resources to learn more about the citizenship process and connect with experts for individuals to start (or finish) their journey to citizenship. For immigration service providers, it provides a simple platform to educate U.S. residents on the value of citizenship and the path to tomorrow and assist them in their journey.</p>
            </article>
            <article className='statementContainer'>
                <h2>Our Values</h2>
                <p>We’re building a portal, a marketplace that aggregates the best resources and is welcoming, accessible, non-judgmental, non-threatening, helpful, trustworthy, well-meaning, educational, directional, dependable and patriotic in guiding immigrants towards citizenship.</p>
            </article>
        </div>
    );
}
