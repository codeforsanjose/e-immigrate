/**
 * this module exports interfaces for taking in excel spreadesheets and loaidng into objects in the database
 * */
import xlsxFile from 'read-excel-file/node';
import { Readable } from 'stream';
import { Types } from 'mongoose';
import { Row } from 'read-excel-file';

import { ArrayElementOf } from '../../types/ArrayElementOf.js';
import { TranslatedContent } from '../../models/translatedContent.js';
import { LanguageOptionCodes, LanguageOptions, WorkshopTitle } from '../../LanguageOptions.js';




type Cell = (ArrayElementOf<Row>) & (string | number);
function isValidRecordCell(value: unknown): value is (string | number) {
    return typeof value === 'string' || typeof value === 'number';
}
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
    type TranslationInfo = Partial<Record<LanguageOptionCodes, Record<Cell, unknown>>>;
    const translations = rows.reduce<TranslationInfo>((obj, row) => {
        for (let i = 1; i < row.length; i++) {
            const languageObject = obj[LanguageOptions[i - 1].code];
            const row0 = row[0];
            if (!isValidRecordCell(row0)) continue;

            if (languageObject != null) {
                languageObject[row0] = row[i];
            }
            else {
                obj[LanguageOptions[i - 1].code] = {
                    [row0]: row[i],
                };
            }
        }
        return obj;
    }, {});

    const title = WorkshopTitle;
    const insertPromises = LanguageOptions.map(async (language) => {
        const content = translations[language.code];
        async function insertNewTranslatedContent() {
            await TranslatedContent.insertMany({
                title,
                language: language.code,
                content,
            });
        }

        async function removeExistingTranslatedContent(_id: Types.ObjectId) {
            await TranslatedContent.findByIdAndDelete({ _id });
        }

        const result = await TranslatedContent.find({
            title,
            language: language.code,
        });
        if (result.length !== 0) {
            await removeExistingTranslatedContent(result[0]._id);
            await insertNewTranslatedContent();
        }
        else {
            await insertNewTranslatedContent();
        }
    });
    await Promise.all(insertPromises);
}
