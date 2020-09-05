import React from 'react';
import LanguageDropdown from '../../components/LanguageDropdown/LanguageDropdown';

import './ChooseLanguage.css';

const ChooseLanguage = ({ language, setLanguage }) => {
  const { step, preferredLanguage } = language.chooseLanguage;
  return (
    <div className='ChooseLanguage'>
      <LanguageDropdown language={ language } setLanguage={ setLanguage } />
    </div>
  );
};

export default ChooseLanguage;
