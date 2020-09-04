import React from 'react';
import { ReactComponent as LanguagePicker } from './LanguagePicker.svg';
import { languageOptions, content } from '../../data/LanguageContent';

import './LanguageDropdown.css';

const LanguageSelect = ({ setLanguage }) => {
  return (
    <div className='languageSelectContainer'>
      <LanguagePicker className='languageIcon' height='2rem' width='2rem' />
      <select onChange={ev => setLanguage(ev.target.value)} >
        <option value='en'>{languageOptions.map(lang => lang.full).join(', ')}...</option>
        {
          languageOptions.map((lang, idx) => {
            return (
              <option className='languageOption' key={idx} value={lang.code} >{lang.full}</option>
            )
          })
        }
      </select>
    </div>
  );
};

const LanguageDropdown = ({ language, setLanguage }) => {
  const allLanguagesItems = languageOptions.map( option => {
    return (<h3>{ content[option.code].chooseLanguage.preferredLanguage }</h3>)
  })
  const allLanguagesContent = (
    <div className="all-languages">
      { allLanguagesItems }
    </div>
  )
  return (
    <div className='languageDropdown'>
      { allLanguagesContent }
      <div className='languageSelect'>
        <LanguageSelect setLanguage={ setLanguage } />
      </div>
    </div>
  );
};

export default LanguageDropdown;
