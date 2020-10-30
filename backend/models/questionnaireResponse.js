const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionnaireSchema = new Schema(
    {
        title: { type: String, required: false, unique: false },
        questionnaireResponse: { type: Array, required: true },
    },
    {
        timestamps: true,
    }
);

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

module.exports = Questionnaire;
