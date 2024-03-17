import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const questionnairesSchema = new Schema(
    {
        // _id: mongoose.Schema.Types.ObjectId,
        // line above results in the following error "document must have an _id before saving"
        title: { type: String, required: false, unique: false },
        language: { type: String, required: false, unique: false },
        questions: { type: Array, required: true },
    },
    {
        timestamps: true,
    },
);

export const Questionnaires = mongoose.model('Questionnaires', questionnairesSchema);


