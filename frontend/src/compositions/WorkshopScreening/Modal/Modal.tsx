import React from 'react';
import { Navigate } from 'react-router-dom';

import './Modal.css';
import { useContentContext } from '../../../contexts/ContentContext';
import { compareDateForValidation } from '../../../utilities/dateHelper';

type EligibilityReasonPresenterProps = {
    userDate: number | Date | string;
    question2: string | null;
};
export function EligibilityReasonPresenter(props: EligibilityReasonPresenterProps) {
    const {
        question2,
        userDate,
    } = props;
    const { content } = useContentContext();
    const marriedDate = content.screeningDateMarried;
    const nonMarriedDate = content.screeningDate;
    if (question2 === 'Yes') {
        if (compareDateForValidation(userDate, marriedDate)) {
            return <div className="Reason">{content.modalText3}</div>;
        }
        else {
            return <Navigate to={'/overview'} />;
        }
    }
    else {
        if (compareDateForValidation(userDate, nonMarriedDate)) {
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
