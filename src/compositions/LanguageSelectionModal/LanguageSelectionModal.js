import React from 'react';
import { languageOptions } from '../../data/LanguageContent';
import Button from '../../components/Button/Button';

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
                        <div key={idx}>
                            <Button
                                value={lang.code}
                                label={lang.full}
                                onClick={(e) => onClick(e)}
                            />
                        </div>
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
