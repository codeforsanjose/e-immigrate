import React, { useState, useEffect } from 'react';
import { content } from '../../data/LanguageContent';

import LanguageDropdown from '../../components/LanguageDropdown/LanguageDropdown';
import Video from '../../components/Video/Video';
import HubspotForm from '../../components/HubspotForm/HubspotForm';

import './MainContainer.css';

const MainContainer = () => {
  const [language, setLanguage] = useState('en');
  const browserLanguage = window.navigator.userLanguage || window.navigator.language;
   
  useEffect(() => {
    if (browserLanguage){
      setLanguage(browserLanguage.substring(0,2))
    }
  },[browserLanguage]);

  return (
    <div className='MainContainer'>
      <div className='wrapper'>
        <div className='items'>
          <LanguageDropdown language={ content[language] } setLanguage={ setLanguage } />
          <Video video={ content[language].video } />
          <HubspotForm hubspotFormId={ content[language].hubspotFormId } />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
