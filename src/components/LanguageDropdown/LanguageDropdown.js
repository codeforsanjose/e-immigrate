import React from 'react';
import { ReactComponent as LanguagePicker } from './LanguagePicker.svg';
import { ReactComponent as ChevronDown } from './ChevronDown.svg';
import { languageOptions } from '../../data/LanguageOptions';

import './LanguageDropdown.css';

const LanguageSelect = ({ setLanguage, language }) => {
    return (
        <div className="languageSelectContainer">
            <LanguagePicker
                className="languageIcon"
                height="26px"
                width="26px"
            />
            <select
                value={language}
                onChange={(ev) => setLanguage(ev.target.value)}
            >
                {languageOptions.map((lang, idx) => {
                    return (
                        <option
                            key={idx}
                            className="languageOption"
                            value={lang.code}
                        >
                            {lang.full}
                        </option>
                    );
                })}
            </select>
            <ChevronDown className="chevronDown" height="16px" width="16px" />
        </div>
    );
};

const LanguageDropdown = ({ language, setLanguage }) => {
    return (
        <div className="languageDropdown">
            <div className="languageSelect">
                <LanguageSelect setLanguage={setLanguage} language={language} />
            </div>
        </div>
    );
};

export default LanguageDropdown;
