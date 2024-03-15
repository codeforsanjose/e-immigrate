import React, { useEffect } from 'react';

import './HubspotForm.css';
import { HubspotInfo } from './types';
import { createHubspotForm } from '../../utilities/hubspot/createForm';
type HubspotSpanishFormProps = {
    hubspot: HubspotInfo;
};
export function HubspotSpanishForm(props: HubspotSpanishFormProps) {
    const {
        hubspot: {
            step, line1, line2, hubspotFormId,
        },
    } = props;

    React.useEffect(() => {
        createHubspotForm({
            portalId: '8034478',
            formId: hubspotFormId,
            target: `#hubspotForm-es`,
        });
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
}
