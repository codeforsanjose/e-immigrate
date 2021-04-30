const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const translatedContentSchema = new Schema(
    {
        title: { type: String, required: false, unique: false },
        language: { type: String, required: false, unique: false },
        content: { type: Object, required: true },
    },
    {
        timestamp: true,
    }
);

const TranslatedContent = mongoose.model(
    'TranslatedContent',
    translatedContentSchema
);

module.exports = TranslatedContent;
