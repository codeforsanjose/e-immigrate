import { questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire, actualRedFlagQuestionKeys, yesValuesTranslated, RedFlagKey } from "../containers/AdminDashboard/constants";

export function isRedFlagKey(value: string) {
    if (value == null || typeof value !== 'string') return false;
    return actualRedFlagQuestionKeys.includes(value);
}

export function isNOTRedFlagKey(value: string) {
    if (value == null || typeof value !== 'string') return false;
    return questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire.includes(value);
}

export function getUpdatedFlag(userResponse: Partial<Record<RedFlagKey, string | null | undefined>>) {
    return Object.entries(userResponse).reduce((acc, [key, value]) => {
        if (value == null) return acc;
        return isRedFlagKey(key)
            ? yesValuesTranslated.includes(value)
                ? true
                : acc
            : acc;
    }, false);
}