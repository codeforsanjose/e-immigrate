import React from 'react';
import { languageOptions } from '../../data/LanguageContent';

import './LanguageSelectionModal.css';

const LanguageSelectionModal = ({
    showModal,
    setShowModal,
    language,
    setLanguage,
}) => {
    const onClick = (e) => {
        setShowModal(false);
        setLanguage(e.target.value);
    };

    const LanguageButtons = () => {
        return (
            <div className="buttonGrid">
                {languageOptions.map((lang, idx) => {
                    return (
                        <button
                            className="languageButton"
                            key={idx}
                            value={lang.code}
                            onClick={(e) => onClick(e)}
                        >
                            {lang.full}
                        </button>
                    );
                })}
            </div>
        );
    };

    if (!showModal) {
        return null;
    }
    return (
        <div className="LanguageSelection">
            <div className="gridContainer">
                <LanguageButtons />
            </div>
        </div>
    );
};

export default LanguageSelectionModal;
