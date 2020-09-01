import React, { useEffect } from 'react';

import './HubspotForm.css';

const HubspotEnglishForm = ({ hubspot }) => {
    const { step, line1, line2, hubspotFormId } = hubspot;

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/shell.js';
        document.body.appendChild(script);

        script.addEventListener('load', () => {
            if (window.hbspt) {
                window.hbspt.forms.create({
                    portalId: '8034478',
                    formId: hubspotFormId,
                    target: `#hubspotForm-en`,
                });
            }
        });
    }, [hubspotFormId]);

    const spanishForm = (
        <div className="hubspot">
            <div className="titleText">
                <div className="step">{step}</div>
                <div className="title1">{line1}</div>
                <div className="title2">{line2}</div>
            </div>
            <div id="hubspotForm-en"></div>
        </div>
    );

    return spanishForm;
};

export default HubspotEnglishForm;
