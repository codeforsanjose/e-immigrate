export const compareDateForValidation = (date: string | number | Date, compareToDate: string) => {
    const dateCheck = new Date(date);
    const compareWithDate = new Date(compareToDate);
    if (dateCheck.getTime() > compareWithDate.getTime()) {
        return false;
    }
    else {
        return true;
    }
};
