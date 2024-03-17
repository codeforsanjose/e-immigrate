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
const questionnaireSchema = new Schema(
    {
        title: { type: String, required: false, unique: false },
        language: { type: String, required: false, unique: false },
        flag: { type: Boolean, required: false, unique: false },
        flagOverride: { type: Boolean, required: false, unique: false },
        emailSent: { type: Boolean, required: false, unique: false },
        agency: { type: String, required: false, unique: false },
        questionnaireResponse: { type: Object, required: true },
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

