import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAfter } from 'date-fns';

import './Modal.css';
import { useContentContext } from '../../../contexts/ContentContext';

type EligibilityReasonPresenterProps = {
    userDate: number | Date;
    question2: string | null;
};
function EligibilityReasonPresenter(props: EligibilityReasonPresenterProps) {
    const {
        question2,
        userDate,
    } = props;
    const { content } = useContentContext();
    const marriedDate = new Date(content.screeningDateMarried);
    const nonMarriedDate = new Date(content.screeningDate);
    if (question2 === 'Yes') {
        if (isAfter(userDate, marriedDate)) {
            return <div className="Reason">{content.modalText3}</div>;
        }
        else {
            return <Navigate to={'/overview'} />;
        }
    }
    else {
        if (isAfter(userDate, nonMarriedDate)) {
            return <div className="Reason">{content.modalText4}</div>;
        }
        else {
            return <Navigate to={'/overview'} />;
        }
    }
}


type ModalProps = {
    showModal: boolean;
    question2: string | null;
    date: number | Date;
};

export function Modal(props: ModalProps) {
    const { showModal, question2, date } = props;
    const { content } = useContentContext();
    
    if (!showModal) return null;

    return (
        <div>
            <div className="Modal">
                <h2>{content.modalText1}</h2>
                <h3>{content.modalText2}</h3>
                <div>
                    <EligibilityReasonPresenter 
                        question2={question2}
                        userDate={date}
                    />
                </div>
                <a href="https://e-immigrate.info/" className="ExitButton">
                    {content.modalExitButton}
                </a>
            </div>
            <div className="ModalOverlay"></div>
        </div>
    );
}
