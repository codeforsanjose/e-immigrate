import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type QuestionnaireSchemaItem = {
    title?: string;
    language?: string;
    flag?: boolean;
    flagOverride?: boolean;
    emailSent?: boolean;
    agency?: string;
    questionnaireResponse: unknown;
    responseDownloadedToExcel?: boolean;
    deleted?: boolean;
};
const responseSchema = new Schema({
    languageCode: { type: String, required: true },
    green_card_through_marriage: { type: String, required: true },
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
    selective_service: { type: String, required: true },
});


const questionnaireSchema = new Schema(
    {
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
    }
);

export const QuestionnaireResponse = mongoose.model(
    'QuestionnaireResponse',
    questionnaireSchema
);
