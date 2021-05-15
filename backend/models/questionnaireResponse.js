const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionnaireSchema = new Schema(
    {
        title: { type: String, required: false, unique: false },
        language: { type: String, required: false, unique: false },
        flag: { type: String, required: false, unique: false },
        emailSent: { type: Boolean, required: false, unique: false },
        agency: { type: String, required: false, unique: false },
        questionnaireResponse: { type: Object, required: true },
        responseDownloadedToExcel: {
            type: Boolean,
            required: false,
            unique: false,
        },
        deleted: { type: Boolean, required: false, unique: false, default: false},
    },
    {
        timestamps: true,
    }
);

const QuestionnaireResponse = mongoose.model(
    'QuestionnaireResponse',
    questionnaireSchema
);

module.exports = QuestionnaireResponse;
