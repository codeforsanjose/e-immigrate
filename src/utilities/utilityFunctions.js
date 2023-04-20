import { isAfter } from 'date-fns';

export const checkDateEligibility = (userSelectedDate, checkDate) => {
    return isAfter(checkDate, userSelectedDate);
};

export const answerSelectionRegexSplit = /, |，|,\n /;
