import { getFromStorage, saveToStorage } from './storage_utils';

export const checkDateEligibility = (userSelectedDate, checkDate) => {
    console.log('user selected date', userSelectedDate);
    const LOCALSTORE_CONTENT = getFromStorage(
        `CIIT_Workshop_Spring_2023-content-en`
    );
    const marriedDate = new Date(LOCALSTORE_CONTENT.screeningDateMarried);
    const nonMarriedDate = new Date(LOCALSTORE_CONTENT.screeningDate);

    // if (question2 === 'Yes') {
    //     if (isAfter(userDate, marriedDate)) {
    //         return <div className="Reason">{content.modalText3}</div>;
    //     } else {
    //         return history.push('/overview');
    //     }
    // } else {
    //     if (isAfter(userDate, nonMarriedDate)) {
    //         return <div className="Reason">{content.modalText4}</div>;
    //     } else {
    //         return history.push('/overview');
    //     }
    // }
    return true;
};
