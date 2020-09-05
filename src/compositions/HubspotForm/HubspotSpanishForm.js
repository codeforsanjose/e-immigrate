import React, { useEffect } from 'react';

import './HubspotForm.css';

const HubspotSpanishForm = ({ hubspot }) => {
    const { step, line1, line2, hubspotFormId } = hubspot;

    useEffect(() => {
        if (window.hbspt) {
            window.hbspt.forms.create({
                portalId: '8034478',
                formId: hubspotFormId,
                target: `#hubspotForm-es`,
            });
        }
    }, [hubspotFormId]);

    const spanishForm = (
        <div className="hubspot">
            <div className="titleText">
                <div className="step">{step}</div>
                <div className="title1">{line1}</div>
                <div className="title2">{line2}</div>
            </div>
            <div id="hubspotForm-es"></div>
        </div>
    );

    return spanishForm;
};

export default HubspotSpanishForm;
