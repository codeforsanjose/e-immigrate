const Questionnaires = require('../../models/questionnaires');
const useFakeDatabase = require('./util');
const { describe, it, expect } = require('@jest/globals');

describe('Questionnaire Model', () => {
    useFakeDatabase(Questionnaires);
    it('Creates an empty array when questions are not provided.', async () => {
        const questionnaire = await Questionnaires.create({
            title: 'test',
            language: 'test',
        });
        expect(questionnaire.questions).toStrictEqual([]);
    });
    it('Successfully creates a questionnaire', async () => {
        const title = 'test';
        const language = 'test';
        const questions = ['questions'];
        const questionnaire = await Questionnaires({
            title,
            language,
            questions,
        });
        expect(questionnaire.title).toBe(title);
        expect(questionnaire.language).toBe(language);
        expect(questionnaire.questions).toStrictEqual(questions);
    });
});
