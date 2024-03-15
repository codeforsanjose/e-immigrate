import React from 'react';
import {LanguageDropdown} from '../../components/LanguageDropdown/LanguageDropdown';

import './ChooseLanguage.css';
import { ReactSetter } from '../../types/common';

type ChooseLanguageProps = {
    language: string;
    setLanguage: ReactSetter<string>;
}
export function ChooseLanguage(props: ChooseLanguageProps) {
    const { language, setLanguage } = props;
    return (
        <div className="ChooseLanguage">
            <LanguageDropdown language={language} setLanguage={setLanguage} />
        </div>
    );
}
