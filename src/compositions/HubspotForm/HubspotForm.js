import React from 'react';
import HubspotSpanishForm from './HubspotSpanishForm'
import HubspotEnglishForm from './HubspotEnglishForm'
import './HubspotForm.css';

const HubspotForm = ({ hubspot, language = 'en', hasWatchedVideo = false }) => {
  const englishForm = language === 'en'
    ? <HubspotEnglishForm hubspot={ hubspot } />
    : null
  const spanishForm = language === 'es'
    ? <HubspotSpanishForm hubspot={ hubspot } />
    : null
  const loadCorrectForm = () => {
    if ( hasWatchedVideo ) {
      if (language === 'en' ) {
        return englishForm
      } else if (language === 'es') {
        return spanishForm
      }
    } else {
      return null
    }
    

  }
  return loadCorrectForm()
}

export default HubspotForm
