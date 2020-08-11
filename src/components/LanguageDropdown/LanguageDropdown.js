import React from 'react';
import { ReactComponent as LanguagePicker } from './LanguagePicker.svg';
import { languageOptions } from '../../data/LanguageContent';

import './LanguageDropdown.css';

const LanguageSelect = ({ setLanguage }) => {
  return (
    <div className='languageSelectContainer'>
      <LanguagePicker className='languageIcon' height='2rem' width='2rem' />
      <select onChange={ev => setLanguage(ev.target.value)} >
        { 
          languageOptions.map((lang, idx) => {
            return (
              <option key={idx} value={lang.code} >{lang.full}</option>
            )
          })
        }
      </select>
    </div>
  );
};

const LanguageDropdown = ({ language, setLanguage }) => {
  const { preferredLanguage } = language;
  return (
    <div className='languageDropdown'>
      <h4 className='preferredLanguage'>{ preferredLanguage }:</h4>
      <div className='languageSelect'>
        <LanguageSelect setLanguage={ setLanguage } />
      </div>
    </div>
  );
};

export default LanguageDropdown;
