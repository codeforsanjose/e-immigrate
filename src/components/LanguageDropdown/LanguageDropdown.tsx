import React from 'react';
import LanguagePicker from './LanguagePicker.svg';
import ChevronDown from './ChevronDown.svg';
import { languageOptions } from '../../data/LanguageOptions';
import classnames from "classnames";
import './LanguageDropdown.css';
import { getEffectiveLanguage } from '../../utilities/languages/getEffectiveLanguage';
type LanguageSelectProps = {
    language: string,
    setLanguage: (value: string) => void;
};

function LanguageSelect(props: LanguageSelectProps) {
    const { 
        setLanguage, 
        language: propLanguage,
    } = props;
    const language = getEffectiveLanguage(propLanguage);
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

type LanguageDropdownProps = {
    className?: string;
    language: string,
    setLanguage: (value: string) => void;
};
export const LanguageDropdown = (props: LanguageDropdownProps) => {
    const { 
        language, 
        setLanguage,
        className,
    } = props;
    const effectiveClassName = classnames('languageDropdown', className);
    return (
        <div className={effectiveClassName}>
            <div className="languageSelect">
                <LanguageSelect setLanguage={setLanguage} language={language} />
            </div>
        </div>
    );
};
