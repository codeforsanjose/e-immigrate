import React from 'react';

import './HubspotForm.css';
import { createHubspotForm } from '../../utilities/hubspot/createForm';
import { HubspotInfo } from './types';

type HubspotEnglishFormProps = {
    hubspot: HubspotInfo;
};
export const HubspotEnglishForm = (props: HubspotEnglishFormProps) => {
    const { hubspot } = props;
    const { step, line1, line2, hubspotFormId } = hubspot;

    React.useEffect(() => {
        createHubspotForm({
            portalId: '8034478',
            formId: hubspotFormId,
            target: `#hubspotForm-en`,
        })
    }, [hubspotFormId]);

    return (
        <div className="hubspot">
            <div className="titleText">
                <div className="step">{step}</div>
                <div className="title1">{line1}</div>
                <div className="title2">{line2}</div>
            </div>
            <div id="hubspotForm-en"></div>
        </div>
    );
};
