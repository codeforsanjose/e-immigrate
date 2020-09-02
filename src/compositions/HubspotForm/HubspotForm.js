import React from 'react';
import HubspotSpanishForm from './HubspotSpanishForm'
import HubspotEnglishForm from './HubspotEnglishForm'
import './HubspotForm.css';

const HubspotForm = ({ hubspot, language = 'en' }) => {
  console.log('language being', language)
  const englishForm = language === 'en'
    ? <HubspotEnglishForm hubspot={ hubspot } />
    : null
  const spanishForm = language === 'es'
    ? <HubspotSpanishForm hubspot={ hubspot } />
    : null
  return language === 'en'
    ? englishForm
    : spanishForm
}

export default HubspotForm
