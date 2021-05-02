import React from 'react';
import { useHistory } from 'react-router-dom';
import { isAfter } from 'date-fns';

import './Modal.css';

const checkEligibility = (userDate, question2, history, content) => {
    const cutoffDate = new Date();
    const marriedDate = new Date(content.screeningDateMarried);
    const nonMarriedDate = new Date(content.screeningDate);

    if (question2 === 'Yes') {
        if (isAfter(userDate, marriedDate)) {
            return <div className="Reason">{content.modalText3}</div>;
        } else {
            return history.push('/overview');
        }
    } else {
        if (isAfter(userDate, nonMarriedDate)) {
            return <div className="Reason">{content.modalText4}</div>;
        } else {
            return history.push('/overview');
        }
    }
};

const Modal = ({ showModal, question2, date, content }) => {
    let history = useHistory();

    if (!showModal) {
        return null;
    }

    return (
        <div>
            <div className="Modal">
                <h2>{content.modalText1}</h2>
                <h3>{content.modalText2}</h3>
                <div>{checkEligibility(date, question2, history, content)}</div>
                <a href="https://e-immigrate.info/" className="ExitButton">
                    {content.modalExitButton}
                </a>
            </div>
            <div className="ModalOverlay"></div>
        </div>
    );
};

export default Modal;
