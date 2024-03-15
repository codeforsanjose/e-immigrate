import React from 'react';
import LanguagePicker from './LanguagePicker.svg';
import ChevronDown from './ChevronDown.svg';
import { languageOptions } from '../../data/LanguageOptions';

import './LanguageDropdown.css';
type LanguageDropdownProps = {
    language: string,
    setLanguage: (value: string) => void;
};
function LanguageSelect(props: LanguageDropdownProps) {
    const { setLanguage, language } = props;
    return (
        <div className="languageSelectContainer">
            <LanguagePicker
                className="languageIcon"
                height="26px"
                width="26px" />
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
}


export const LanguageDropdown = (props: LanguageDropdownProps) => {
    const { language, setLanguage } = props;
    return (
        <div className="languageDropdown">
            <div className="languageSelect">
                <LanguageSelect setLanguage={setLanguage} language={language} />
            </div>
        </div>
    );
};
