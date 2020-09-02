import React, { useState, useEffect } from 'react';
import { content } from '../../data/LanguageContent';

import LandingPage from '../../compositions/LandingPage/LandingPage';
import ChooseLanguage from '../../compositions/ChooseLanguage/ChooseLanguage';
import Video from '../../compositions/Video/Video';
import HubspotForm from '../../compositions/HubspotForm/HubspotForm';

import './MainContainer.css';

const MainContainer = () => {
  const [language, setLanguage] = useState('en');
  const browserLanguage = window.navigator.userLanguage || window.navigator.language;
  console.log('language is', language)
  useEffect(() => {
    setLanguage(browserLanguage.substring(0,2))
  },[browserLanguage]);

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/shell.js'
    document.body.appendChild(script)
    
    script.addEventListener('load', () => {
      if(window.hbspt) {
        window.hbspt.forms.create({
          portalId: '8034478',
          formId: content[language].hubspot,
          target: `#hubspotForm-en`,
        })
      }
    })
  }, [])

  return (
    <div className='MainContainer'>
      <div className='wrapper'>
        <div className='items'>
          <LandingPage welcomeMessage={ content[language].welcomeMessage }/>
          <ChooseLanguage language={ content[language] } setLanguage={ setLanguage } />
          <Video video={ content[language].video } />
          <HubspotForm hubspot={ content[language].hubspot } language={ language } />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
