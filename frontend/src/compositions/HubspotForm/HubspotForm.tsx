import React from 'react';
import { HubspotSpanishForm } from './HubspotSpanishForm';
import { HubspotEnglishForm } from './HubspotEnglishForm';
import { HubspotVietForm } from './HubspotVietForm';
import './HubspotForm.css';
import { HubspotInfo } from './types';

type HubspotFormProps = {
    hubspot: HubspotInfo;
    language?: string;
    hasWatchedVideo?: boolean;
};
export function HubspotForm(props: HubspotFormProps) {
    const { 
        hubspot, 
        language = 'en', 
        hasWatchedVideo = false,
    } = props;
    const englishForm = <HubspotEnglishForm hubspot={hubspot} />;
    const spanishForm = <HubspotSpanishForm hubspot={hubspot} />;
    const vietForm = <HubspotVietForm hubspot={hubspot} />;
    const loadCorrectForm = () => {
        if (hasWatchedVideo) {
            if (language === 'en') {
                return englishForm;
            }
            else if (language === 'es') {
                return spanishForm;
            }
            else if (language === 'vi') {
                return vietForm;
            }
        }
        else {
            return null;
        }
    };
    return loadCorrectForm();
}
