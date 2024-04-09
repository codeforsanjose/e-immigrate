import mongoose from 'mongoose';
import { WithDefaultMongooseId, WithMongooseTimestamps } from './core/types.js';

/**
 *   The fields listed here will be included in the
 * generated excel files.
 */
export const fieldsExportableToExcel = [
    'green_card_through_marriage',
    'legal_resident_date',
    'gender',
    'preferred_language',
    'full_name',
    'birth_country',
    'US_zipcode',
    'mobile_phone',
    'age',
    'ethnicity',
    'still_married_to_that_citizen',
    'email',
    'how_did_you_hear_about_event',
    'receive_public_benefits',
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
    'owed_taxes_since_LPR',
    'taxes_payment_plan',
    'genocide_torture_killing_hurting',
    "court-martialed_disciplinced_in_military",
    'US_citizen_registered_voted',
    'associated_terrorist_orgs_gangs',
    "live_US_18-26_and_are_26-31",
    'selective_service',
] satisfies Array<keyof ResponseEntity>;

/**
 *   NOTE: if you add a field here, and want it
 * included in the generated excel files,
 * add it to {@link fieldsExportableToExcel}
 */
export type ResponseEntity = {
    languageCode: string;
    green_card_through_marriage: string;
    legal_resident_date?: string;
    gender: string;
    preferred_language: string;
    full_name: string;
    birth_country: string;
    US_zipcode: string;
    mobile_phone: string;
    age: string;
    ethnicity: string;
    still_married_to_that_citizen?: string;
    email: string;
    how_did_you_hear_about_event: string;
    receive_public_benefits: string;
    contact_with_police: string;
    habitual_alcoholic_drugs: string;
    money_from_illegal_gambling: string;
    contact_with_immigration_officer: string;
    helped_enter_or_entered_US_illegally: string;
    married_to_multiple_people_same_time: string;
    failed_support_kids_pay_alimony: string;
    asylum_travel_back_home_country: string;
    deported_removed_excluded_from_US: string;
    lied_to_obtain_immigrant_benefit: string;
    lied_to_obtain_welfare_benefit: string;
    'left_US_>6mo_while_LPR': string;
    owed_taxes_since_LPR: string;
    taxes_payment_plan: string;
    genocide_torture_killing_hurting: string;
    "court-martialed_disciplinced_in_military": string;
    US_citizen_registered_voted: string;
    associated_terrorist_orgs_gangs: string;
    "live_US_18-26_and_are_26-31": string;
    selective_service?: string;
};


export type QuestionnaireResponseEntity = WithMongooseTimestamps<{
    title?: string;
    language?: string;
    flag?: boolean;
    flagOverride?: boolean;
    emailSent?: boolean;
    agency?: string;
    questionnaireResponse: ResponseEntity;
    responseDownloadedToExcel?: boolean;
    deleted?: boolean;
}>;
export type QuestionnaireResponseEntityWithId = WithDefaultMongooseId<QuestionnaireResponseEntity>;

const responseSchema = new mongoose.Schema<ResponseEntity>({
    languageCode: { type: String, required: true },
    green_card_through_marriage: { type: String, required: false },
    legal_resident_date: { type: String, required: false },
    gender: { type: String, required: true },
    preferred_language: { type: String, required: true },
    full_name: { type: String, required: true },
    birth_country: { type: String, required: true },
    US_zipcode: { type: String, required: true },
    mobile_phone: { type: String, required: true },
    age: { type: String, required: true },
    ethnicity: { type: String, required: true },
    still_married_to_that_citizen: { type: String, required: false },
    email: { type: String, required: true },
    how_did_you_hear_about_event: { type: String, required: true },
    receive_public_benefits: { type: String, required: true },
    contact_with_police: { type: String, required: true },
    habitual_alcoholic_drugs: { type: String, required: true },
    money_from_illegal_gambling: { type: String, required: true },
    contact_with_immigration_officer: { type: String, required: true },
    helped_enter_or_entered_US_illegally: { type: String, required: true },
    married_to_multiple_people_same_time: { type: String, required: true },
    failed_support_kids_pay_alimony: { type: String, required: true },
    asylum_travel_back_home_country: { type: String, required: true },
    deported_removed_excluded_from_US: { type: String, required: true },
    lied_to_obtain_immigrant_benefit: { type: String, required: true },
    lied_to_obtain_welfare_benefit: { type: String, required: true },
    'left_US_>6mo_while_LPR': { type: String, required: true },
    owed_taxes_since_LPR: { type: String, required: true },
    taxes_payment_plan: { type: String, required: true },
    genocide_torture_killing_hurting: { type: String, required: true },
    "court-martialed_disciplinced_in_military": { type: String, required: true },
    US_citizen_registered_voted: { type: String, required: true },
    associated_terrorist_orgs_gangs: { type: String, required: true },
    "live_US_18-26_and_are_26-31": { type: String, required: true },
    selective_service: { type: String, required: false },
});



const questionnaireSchema = new mongoose.Schema<QuestionnaireResponseEntity>({
    title: { type: String, required: false, unique: false },
    language: { type: String, required: false, unique: false },
    flag: { type: Boolean, required: false, unique: false },
    flagOverride: { type: Boolean, required: false, unique: false },
    emailSent: { type: Boolean, required: false, unique: false },
    agency: { type: String, required: false, unique: false },
    questionnaireResponse: { type: responseSchema, required: true },
    responseDownloadedToExcel: {
        type: Boolean,
        required: false,
        unique: false,
    },
    deleted: {
        type: Boolean,
        required: false,
        unique: false,
        default: false,
    },
},
{
    timestamps: true,
});

export const QuestionnaireResponse = mongoose.model<QuestionnaireResponseEntity>(
    'QuestionnaireResponse',
    questionnaireSchema
);
