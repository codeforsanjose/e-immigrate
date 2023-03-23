const { describe, expect, it } = require('@jest/globals');
const useFakeDatabase = require('./util');
const QuestionnaireResponse = require('../../models/questionnaireResponse');
const {
    Error: { ValidationError },
} = require('mongoose');

describe('Questionnaire Response Table', () => {
    useFakeDatabase(QuestionnaireResponse);
    it('Fails without a questionnaire response object', () =>
        expect(() => QuestionnaireResponse.create({})).rejects.toThrowError(
            ValidationError
        ));
    it('Successfully create a questionnare response', async () => {
        const title = 'test';
        const language = 'test';
        const flag = true;
        const flagOverride = true;
        const emailSent = true;
        const agency = 'test';
        const questionnaireResponse = {};
        const responseDownloadedToExcel = true;
        const deleted = true;
        const response = await QuestionnaireResponse.create({
            title,
            language,
            flag,
            flagOverride,
            emailSent,
            agency,
            questionnaireResponse,
            responseDownloadedToExcel,
            deleted,
        });
        expect(response.title).toBe(title);
        expect(response.language).toBe(language);
        expect(response.flag).toBe(flag);
        expect(response.flagOverride).toBe(flagOverride);
        expect(response.emailSent).toBe(emailSent);
        expect(response.agency).toBe(agency);
        expect(response.questionnaireResponse).toStrictEqual(
            questionnaireResponse
        );
        expect(response.responseDownloadedToExcel).toBe(
            responseDownloadedToExcel
        );
        expect(response.deleted).toBe(deleted);
    });
});
