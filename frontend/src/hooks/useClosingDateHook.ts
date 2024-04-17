type ClosingDateHookProps = {
    closingDate: string;
};
export function useClosingDateHook(props: ClosingDateHookProps) {
    const {
        closingDate,
    } = props;
    const closedDate = new Date(closingDate).getTime(); // this date should be added to spreadsheets
    const nowDate = new Date().getTime();
    if (nowDate > closedDate) {
        return true;
    }
    else {
        return false;
    }
}