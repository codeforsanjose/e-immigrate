import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const translatedContentSchema = new Schema(
    {
        title: { type: String, required: false, unique: false },
        language: { type: String, required: false, unique: false },
        content: { type: Object, required: true },
    },
    {
        timestamps: true,
    }
);

export const TranslatedContent = mongoose.model(
    'TranslatedContent',
    translatedContentSchema
);

