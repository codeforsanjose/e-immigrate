import React from 'react';
import { languageOptions } from '../../data/LanguageContent';
<<<<<<< HEAD
import Button from '../../components/Button/Button';
=======
>>>>>>> f6a87142ceb5287c9296f778959c162fec7d2306

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
<<<<<<< HEAD
                        <div key={idx}>
                            <Button
                                value={lang.code}
                                label={lang.full}
                                onClick={(e) => onClick(e)}
                            />
                        </div>
=======
                        <button
                            className="languageButton"
                            key={idx}
                            value={lang.code}
                            onClick={(e) => onClick(e)}
                        >
                            {lang.full}
                        </button>
>>>>>>> f6a87142ceb5287c9296f778959c162fec7d2306
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
