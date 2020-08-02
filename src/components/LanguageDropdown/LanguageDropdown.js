import React from 'react';
import { ReactComponent as LanguagePicker } from './LanguagePicker.svg';
import { languageOptions } from '../../data/LanguageContent';

import './LanguageDropdown.css';

const LanguageDropdown = ({ language, setLanguage }) => {
  return (
    <div className='languageDropdown'>
      <div className='label'>
        <LanguagePicker height='2rem' width='2rem' />
        <h4>{ language.language }:</h4>
      </div>
      <div>
        {/* <LanguagePicker height='2rem' width='2rem' /> */}
        <select onChange={ev => setLanguage(ev.target.value)} >
          { 
            languageOptions.map((lang, idx) => <option key={idx} value={lang.code} >{lang.full}</option>)
          }
        </select>
      </div>
    </div>
  );
};

export default LanguageDropdown;
