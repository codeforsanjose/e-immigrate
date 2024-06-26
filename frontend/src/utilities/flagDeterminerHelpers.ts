import {
    questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire,
    actualRedFlagQuestionKeys,
    yesValuesTranslated,
    RedFlagKey,
    fullWaiverQuestionKeys,
    answeringNoIsRedFlag,
    noValuesTranslated,
} from "../containers/AdminDashboard/constants";

export function isRedFlagKey(value: string) {
    if (value == null || typeof value !== 'string') return false;
    return actualRedFlagQuestionKeys.includes(value);
}

export function isAnswerNoRedFlagKey(value: string) {
    if (value == null || typeof value !== 'string') return false;
    return answeringNoIsRedFlag.includes(value);
}

export function isNOTRedFlagKey(value: string) {
    if (value == null || typeof value !== 'string') return false;
    return questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire.includes(value);
}
export function fullWaiverQuestionAnsweredYesTo(questionKey: string, value: string) {
    if (fullWaiverQuestionKeys.includes(questionKey)) {
        return yesValuesTranslated.includes(value);
    }
    return false;
}
export function getUpdatedFlag(userResponse: Partial<Record<RedFlagKey, string | null | undefined>>) {
    const result = Object.entries(userResponse).map(([key, value]) => {
        if (value == null) return false;
        return getUpdatedFlagForKey(key, value, userResponse);
    });
    return result.includes(true);
}

export function getUpdatedFlagForKey(key: RedFlagKey, value: string, userResponse: Partial<Record<RedFlagKey, string | null | undefined>>) {
    if (isRedFlagKey(key)) {
        return yesValuesTranslated.includes(value);
    }
    else if (isAnswerNoRedFlagKey(key)) {
        if (key === 'taxes_payment_plan') {
            const prevVal = userResponse.owed_taxes_since_LPR ?? '';
            if (yesValuesTranslated.includes(prevVal)) {
                return noValuesTranslated.includes(value);     
            }
        }
        return false;
    }
    else {
        return false;
    }
}