const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionnaireSchema = new Schema(
    {
        title: { type: String, required: false, unique: false },
        language: { type: String, required: false, unique: false },
        questionnaireResponse: { type: Object, required: true },
    },
    {
        timestamps: true,
    }
);

const Questionnaire = mongoose.model(
    'QuestionnaireResponse',
    questionnaireSchema
);

module.exports = Questionnaire;
