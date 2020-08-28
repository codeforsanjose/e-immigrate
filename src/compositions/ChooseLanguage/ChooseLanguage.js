import React from 'react';
import LanguageDropdown from '../../components/LanguageDropdown/LanguageDropdown';

import './ChooseLanguage.css';

const ChooseLanguage = ({ language, setLanguage }) => {
  const { step, preferredLanguage } = language.chooseLanguage;
  return (
    <div>
      <div className='titleText'>
        <div className='step'>{ step }</div>
        <div className='title1'>{ preferredLanguage }</div>
      </div>
      <LanguageDropdown language={ language } setLanguage={ setLanguage } />
    </div>
  );
};

export default ChooseLanguage;
