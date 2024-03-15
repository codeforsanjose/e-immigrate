import React from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { isAfter } from 'date-fns';

import './Modal.css';
import { ModalContent } from './types';

function checkEligibility(
    userDate: number | Date, 
    question2: string | null,
    navigate: NavigateFunction, 
    content: ModalContent,
) {
    const cutoffDate = new Date();
    const marriedDate = new Date(content.screeningDateMarried);
    const nonMarriedDate = new Date(content.screeningDate);

    if (question2 === 'Yes') {
        if (isAfter(userDate, marriedDate)) {
            return <div className="Reason">{content.modalText3}</div>;
        }
        else {
            navigate('/overview');
            return null;
        }
    }
    else {
        if (isAfter(userDate, nonMarriedDate)) {
            return <div className="Reason">{content.modalText4}</div>;
        }
        else {
            navigate('/overview');
            return null;
        }
    }
}

type ModalProps = {
    showModal: boolean;
    question2: string | null;
    date: number | Date;
    content: ModalContent;
};

export function Modal(props: ModalProps) {
    const { showModal, question2, date, content } = props;
    const navigate = useNavigate();

    if (!showModal) {
        return null;
    }

    return (
        <div>
            <div className="Modal">
                <h2>{content.modalText1}</h2>
                <h3>{content.modalText2}</h3>
                <div>{checkEligibility(date, question2, navigate, content)}</div>
                <a href="https://e-immigrate.info/" className="ExitButton">
                    {content.modalExitButton}
                </a>
            </div>
            <div className="ModalOverlay"></div>
        </div>
    );
}
