import React from 'react';
import { useHistory } from 'react-router-dom';

import './Modal.css';

const checkEligibility = (userDate, question2, history) => {
    const currentDate = new Date();
    if (question2 === 'Yes') {
        if (currentDate - userDate < 86781618000) {
            return (
                <div className="Reason">
                    You have been a legal permanent resident for less than 2
                    years and 9 months.
                </div>
            );
        } else {
            return history.push('/overview');
        }
    } else {
        if (currentDate - userDate < 149895522000) {
            return (
                <div className="Reason">
                    You have been a legal permanent resident for less than 4
                    years and 9 months.
                </div>
            );
        } else {
            return history.push('/overview');
        }
    }
};

const Modal = ({ showModal, question2, date }) => {
    let history = useHistory();

    if (!showModal) {
        return null;
    }

    return (
        <div>
            <div className="Modal">
                <h2>We're sorry!</h2>
                <h3>
                    Based on your responses, you can't participate in this
                    workshop because:
                </h3>
                <div>{checkEligibility(date, question2, history)}</div>
                <a href="https://e-immigrate.info/" className="ExitButton">
                    Exit
                </a>
            </div>
            <div className="ModalOverlay"></div>
        </div>
    );
};

export default Modal;
