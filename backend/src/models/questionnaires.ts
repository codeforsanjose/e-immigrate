import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const questionSchema = new Schema({
    id: { type: String, unique: false, required: true },
    slug: { type: String, unique: false, required: true },
    category: { type: String, unique: false, required: true },
    text: { type: String, unique: false, required: true },
    questionType: { type: String, unique: false, required: true },
    answerSelections: { type: String, unique: false, required: false },
    answerValues: { type: String, unique: false, required: false },
    required: { type: Boolean, unique: false, required: true },
    followUpQuestionSlug: { type: String, unique: false, required: false },
    parentQuestionSlug: { type: String, unique: false, required: false },
});
export const questionnairesSchema = new Schema(
    {
        // _id: mongoose.Schema.Types.ObjectId,
        // line above results in the following error "document must have an _id before saving"
        title: { type: String, required: false, unique: false },
        language: { type: String, required: false, unique: false },
        questions: { type: [questionSchema], required: true },
    },
    {
        timestamps: true,
    },
);

export const Questionnaires = mongoose.model('Questionnaires', questionnairesSchema);
