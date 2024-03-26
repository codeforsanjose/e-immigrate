/**
 * this module exports interfaces for taking in excel spreadesheets and loaidng into objects in the database
 * */
import xlsxFile from 'read-excel-file/node';
import { Readable } from 'stream';

import { TranslatedContent } from '../../models/translatedContent.js';
import { LanguageOptionCodes, LanguageOptions, WorkshopTitle } from '../../LanguageOptions.js';
import { logger } from '../logging/logger.js';

/**
 *  load translation excel file into objects in the TranslatedContent collection
 *
 * @export
 * @param {Buffer} excelFileContent Node Buffer containing the excel file, this 
 * assumes must be formmated with proper translation sheet format
 */
export async function loadTranslationXlsxIntoDB(excelFileContent: Buffer) {
    const stream = new Readable();
    stream.push(excelFileContent);
    stream.push(null);
    const rows = await xlsxFile(stream);
    type TranslationInfo = Partial<Record<LanguageOptionCodes, Record<string, unknown>>>;
    const translations = rows.reduce<TranslationInfo>((obj, row) => {
        for (let i = 1; i < row.length; i++) {
            const languageObject = obj[LanguageOptions[i - 1].code];
            const fieldLabel = row[0];
            if (typeof fieldLabel !== 'string') {
                logger.error({
                    fieldLabel,
                    row: i,
                }, 'The field name for a row wasnt a string');
                continue;
            }

            if (languageObject != null) {
                languageObject[fieldLabel] = row[i];
            }
            else {
                obj[LanguageOptions[i - 1].code] = {
                    [fieldLabel]: row[i],
                };
            }
        }
        return obj;
    }, {});

    const insertPromises = LanguageOptions.map(async (language) => {
        const existing = await TranslatedContent.findOne({
            title: WorkshopTitle,
            language: language.code,
        });
        if (existing != null) {
            await TranslatedContent.findByIdAndDelete({ 
                _id: existing._id,
            });
        }
        await TranslatedContent.insertMany({
            title: WorkshopTitle,
            language: language.code,
            content: translations[language.code],
        });
    });
    await Promise.all(insertPromises);
}
