import React from 'react';
import { languageOptions } from '../../data/LanguageOptions';
import { Button } from '../../components/Button/Button';

import './LanguageSelectionModal.css';
import { DirectReactSetter, ReactSetter } from '../../types/common';

type LanguageSelectionModalProps = {
    showModal: boolean;
    setShowModal: ReactSetter<boolean>;
    language: string;
    setLanguage: DirectReactSetter<string>;
};
type LanguageButtonsProps = {
    onClick: (value: string) => void;
}
function LanguageButtons(props: LanguageButtonsProps) {
    const {
        onClick,
    } = props;
    return (
        <div className="buttonGrid">
            {languageOptions.map((lang, idx) => {
                return (
                    <div key={idx}>
                        <Button
                            value={lang.code}
                            label={lang.full}
                            onClick={(e) => onClick(lang.code)} />
                    </div>
                );
            })}
        </div>
    );
}
export function LanguageSelectionModal(props: LanguageSelectionModalProps) {
    const {
        language,
        setLanguage,
        setShowModal,
        showModal,
    } = props;
    const onClick = React.useCallback((value: string) => {
        setShowModal(false);
        setLanguage(value);
    }, []);

    

    if (!showModal) {
        return null;
    }
    return (
        <div className="LanguageSelection">
            <div className="gridContainer">
                <LanguageButtons onClick={onClick}/>
            </div>
        </div>
    );
}

