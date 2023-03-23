const { describe, expect, it } = require('@jest/globals');
const TranslatedContent = require('../../models/translatedContent');
const {
    Error: { ValidationError },
} = require('mongoose');
const useFakeDatabase = require('./util');

describe('Translated Content Model', () => {
    useFakeDatabase(TranslatedContent);
    it('Fails on missing content', () =>
        expect(() =>
            TranslatedContent.create({ title: 'test', language: 'test' })
        ).rejects.toThrowError(ValidationError));
    it('Successfully creates translated content', async () => {
        const title = 'test';
        const language = 'test';
        const content = 'test';
        const translatedContent = await TranslatedContent.create({
            title,
            content,
            language,
        });
        expect(translatedContent.title).toBe(title);
        expect(translatedContent.language).toBe(language);
        expect(translatedContent.content).toBe(content);
    });
});
