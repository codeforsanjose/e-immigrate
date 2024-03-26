import React from 'react';
import { languageOptions } from '../../data/LanguageOptions';
import { Button } from '../../components/Button/Button';

import './LanguageSelectionModal.css';
import { ReactSetter } from '../../types/common';
import { useLanguageContext } from '../../contexts/LanguageContext';


type LanguageButtonsProps = {
    onClick: (value: string) => void;
};
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

type LanguageSelectionModalProps = {
    showModal: boolean;
    setShowModal: ReactSetter<boolean>;
};
export function LanguageSelectionModal(props: LanguageSelectionModalProps) {
    const {
        setShowModal,
        showModal,
    } = props;
    const {
        setLanguage,
    } = useLanguageContext();
    const onClick = React.useCallback((value: string) => {
        setShowModal(false);
        setLanguage(value);
    }, [setLanguage, setShowModal]);

    if (!showModal) return null;
    return (
        <div className="LanguageSelection">
            <div className="gridContainer">
                <LanguageButtons onClick={onClick}/>
            </div>
        </div>
    );
}
