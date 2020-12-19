const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionnairesSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        title: { type: String, required: false, unique: false },
        questionnaires: { type: Array, required: true },
    },
    {
        timestamps: true,
    }
);

const Questionnaires = mongoose.model('Questionnaires', questionnairesSchema);

module.exports = Questionnaires;
