const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionnairesSchema = new Schema(
    {
        // _id: mongoose.Schema.Types.ObjectId,
        title: { type: String, required: false, unique: false },
        questions: { type: Array, required: true },
    },
    {
        timestamp: true,
    }
);

const Questionnaires = mongoose.model('Questionnaires', questionnairesSchema);

module.exports = Questionnaires;
