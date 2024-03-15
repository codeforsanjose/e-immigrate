import React from 'react';

import './HubspotForm.css';
import { HubspotInfo } from './types';
import { createHubspotForm } from '../../utilities/hubspot/createForm';
type HubspotVietFormProps = {
    hubspot: HubspotInfo;
};
export function HubspotVietForm(props: HubspotVietFormProps) {
    const {
        hubspot: {
            step, line1, line2, hubspotFormId,
        },
    } = props;

    React.useEffect(() => {
        createHubspotForm({
            portalId: '8034478',
            formId: hubspotFormId,
            target: `#hubspotForm-vi`,
        });
    }, [hubspotFormId]);

    const spanishForm = (
        <div className="hubspot">
            <div className="titleText">
                <div className="step">{step}</div>
                <div className="title1">{line1}</div>
                <div className="title2">{line2}</div>
            </div>
            <div id="hubspotForm-vi"></div>
        </div>
    );

    return spanishForm;
}
