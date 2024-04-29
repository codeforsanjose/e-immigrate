import { ArrayElementOf } from "../types/ArrayElementOf";

export const fullWaiverQuestionKeys = ['receive_public_benefits'];

// these are keys of questions that are in the "RED FLAG section" but are not actually red flag questions, i know, its confusing
export const questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire = [
    'male',
    'still_married_to_that_citizen',
    'receive_public_benefits',
    'live_US_18-26_and_are_26-31',
    'selective_service',
    'green_card_through_marriage',
    'speak_basic_english',
    'follow_up_basic_english_50_years_gc_20_years',
    'follow_up_basic_english_55_years_gc_15_years',
    'taxes_payment_plan',
];
export const actualRedFlagQuestionKeys = [
    'contact_with_police',
    'habitual_alcoholic_drugs',
    'money_from_illegal_gambling',
    'contact_with_immigration_officer',
    'helped_enter_or_entered_US_illegally',
    'married_to_multiple_people_same_time',
    'failed_support_kids_pay_alimony',
    'asylum_travel_back_home_country',
    'deported_removed_excluded_from_US',
    'lied_to_obtain_immigrant_benefit',
    'lied_to_obtain_welfare_benefit',
    'left_US_>6mo_while_LPR',
    'lived_outsideUS>insideUS_since_LPR',
    'owed_taxes_since_LPR',
    'genocide_torture_killing_hurting',
    'served_military_group_against_govt',
    'court-martialed_disciplinced_in_military',
    'associated_terrorist_orgs_gangs',
    'US_citizen_registered_voted',

];
export type RedFlagKey = ArrayElementOf<typeof actualRedFlagQuestionKeys>;

export function isRedFlagKey(value: string) {
    if (value == null || typeof value !== 'string') return false;
    return actualRedFlagQuestionKeys.includes(value);
}

export function isWaiverFlagKey(value: string) {
    if (value == null || typeof value !== 'string') return false;
    return fullWaiverQuestionKeys.includes(value);
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

// need this due to values being set as translated and not the YES or no
export const yesValuesTranslated = ['Yes', 'Sí', 'Có', 'Oo', '是', '是', '是', 'Да', 'አዎ', 'نعم', 'بله', 'हाँ', '예', 'هو', 'ਹਾਂ', 'Sim'];