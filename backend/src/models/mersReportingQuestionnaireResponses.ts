import mongoose from 'mongoose';
import { WithDefaultMongooseId, WithMongooseTimestamps } from './core/types.js';

/**
 *   The fields listed here will be included in the
 * generated excel files.
 */
export const fieldsExportableToExcel = [
    'how_did_you_hear_about_event',
    'age',
    'birth_country',
    'how_many_in_household',
    'employment_status',
    'household_income_monthly',
    'highest_level_education',
    'why_apply_for_citizenship',
    'other_reason_for_citizenship',
    'number_of_children_under_18_not_us_citizens',
    'county_live_in_now',
    'other_county_live_in',

    'number_of_years_as_legal_permanant_resident',
    'parents_us_citizen_before_your_18th_birthday',
    'follow_up_parents_rule_out_acuisition',
    'deemed_to_acquire_or_derived_citizenship',
    'qualify_english_exemption',
    'english_ready',
    'last_5_years_single_trip_outside_us_longer_than_6months',
    'qualify_fee_waiver',
    'qualify_for_file_N400',
    'follow_up_NO_qualify_for_N400',

    'full_name',
    'fee_waiver_status_application_complete',
    'follow_up_if_not_eligible_fee_waiver',
    'n400_status_report',
    'follow_up_n400_status_report',
    'understand_next_step',
    'better_understanding_citizenship_process',
    'participant_id_document',
] satisfies Array<keyof MersReportingResponseEntity>;

/**
 *   NOTE: if you add a field here, and want it
 * included in the generated excel files,
 * add it to {@link fieldsExportableToExcel}
 */
export type MersReportingResponseEntity = {
    how_did_you_hear_about_event: string;
    age: string;
    birth_country: string;
    how_many_in_household: string;
    employment_status: string;
    household_income_monthly: string;
    highest_level_education: string;
    why_apply_for_citizenship: string;
    other_reason_for_citizenship: string;
    number_of_children_under_18_not_us_citizens: string;
    county_live_in_now: string;
    other_county_live_in: string;

    number_of_years_as_legal_permanant_resident: string;
    parents_us_citizen_before_your_18th_birthday: string;
    follow_up_parents_rule_out_acuisition: string;
    deemed_to_acquire_or_derived_citizenship: string;
    qualify_english_exemption: string;
    english_ready: string;
    last_5_years_single_trip_outside_us_longer_than_6months: string;
    qualify_fee_waiver: string;
    qualify_for_file_N400: string;
    follow_up_NO_qualify_for_N400: string;

    full_name: string;
    fee_waiver_status_application_complete: string;
    follow_up_if_not_eligible_fee_waiver: string;
    n400_status_report: string;
    follow_up_n400_status_report: string;
    understand_next_step: string;
    better_understanding_citizenship_process: string;
    participant_id_document: string;
};


export type MersReportingQuestionnaireResponseEntity = WithMongooseTimestamps<{
    agency?: string;
    mersReportingQuestionnaireResponse: MersReportingResponseEntity;
    deleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    unique_flow_id?: string;
}>;
export type MersReportingQuestionnaireResponseEntityWithId = WithDefaultMongooseId<MersReportingQuestionnaireResponseEntity>;

const responseSchema = new mongoose.Schema<MersReportingResponseEntity>({
    how_did_you_hear_about_event: { type: String, required: false },
    age: { type: String, required: false },
    birth_country: { type: String, required: false },
    how_many_in_household: { type: String, required: false },
    employment_status: { type: String, required: false },
    household_income_monthly: { type: String, required: false },
    highest_level_education: { type: String, required: false },
    why_apply_for_citizenship: { type: String, required: false },
    other_reason_for_citizenship: { type: String, required: false },
    number_of_children_under_18_not_us_citizens: { type: String, required: false },
    county_live_in_now: { type: String, required: false },
    other_county_live_in: { type: String, required: false },

    number_of_years_as_legal_permanant_resident: { type: String, required: false },
    parents_us_citizen_before_your_18th_birthday: { type: String, required: false },
    follow_up_parents_rule_out_acuisition: { type: String, required: false },
    deemed_to_acquire_or_derived_citizenship: { type: String, required: false },
    qualify_english_exemption: { type: String, required: false },
    english_ready: { type: String, required: false },
    last_5_years_single_trip_outside_us_longer_than_6months: { type: String, required: false },
    qualify_fee_waiver: { type: String, required: false },
    qualify_for_file_N400: { type: String, required: false },
    follow_up_NO_qualify_for_N400: { type: String, required: false },

    full_name: { type: String, required: false },
    fee_waiver_status_application_complete: { type: String, required: false },
    follow_up_if_not_eligible_fee_waiver: { type: String, required: false },
    n400_status_report: { type: String, required: false },
    follow_up_n400_status_report: { type: String, required: false },
    understand_next_step: { type: String, required: false },
    better_understanding_citizenship_process: { type: String, required: false },
    participant_id_document: { type: String, required: false },
});



const questionnaireSchema = new mongoose.Schema<MersReportingQuestionnaireResponseEntity>({
    createdAt: { type: String, required: false },
    updatedAt: { type: String, required: false },
    unique_flow_id: { type: String, required: false },
    agency: { type: String, required: false, unique: false },
    mersReportingQuestionnaireResponse: { type: responseSchema, required: true },
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

export const MersReportingQuestionnaireResponse = mongoose.model<MersReportingQuestionnaireResponseEntity>(
    'MersReportingQuestionnaireResponse',
    questionnaireSchema
);
