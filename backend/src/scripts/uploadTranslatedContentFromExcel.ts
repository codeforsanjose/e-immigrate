import xlsxFile, { Row } from 'read-excel-file/node';
import { LanguageOptionCodes, LanguageOptions, TranslatedContentLanguageSheetMap, WorkshopTitle } from '../LanguageOptions.js';
import { getFullDataPath } from '../features/data/locator.js';
import { sendRequest } from './helpers/sendRequest.js';
import { forEachAsync } from '../features/iterators/forEachAsync.js';
import { ContentText, isContentTextKey } from '../types/ContentText.js';
import { scopedLogger } from '../features/logging/logger.js';
// 
type LanguageColumnMap = Partial<Record<LanguageOptionCodes, number>>;

/**
 *  Construct a mapping from 'language code' to 'column number'
 *
 * @param {Row} row
 * @return {*}  {Partial<Record<LanguageOptionCodes, number>>}
 */
function getLanguageColumnMap(row: Row): Partial<Record<LanguageOptionCodes, number>> {
    // build a mapping from 'label in excel' -> 'language code'
    const labelCodeMap = new Map<string, LanguageOptionCodes>();
    LanguageOptions.forEach(language => {
        const label = TranslatedContentLanguageSheetMap[language.code];
        if (label == null || label === '') return;
        labelCodeMap.set(label, language.code);
    });
    return row.reduce<LanguageColumnMap>((prev, cell, cellIndex) => {
        if (cellIndex === 0) return prev;
        else if (cell == null || typeof cell !== 'string') return prev;
        const code = labelCodeMap.get(cell);
        if (code == null) return prev;
        return {
            ...prev,
            [code]: cellIndex,
        };
    }, {});
}

/**
 *  Extract the translated content fields for each language.
 *
 * @param {Array<Row>} rows
 * @return {*} 
 */
function loadTranslationsFromExcel(rows: Array<Row>) {
    type LanguageMap = Partial<Record<LanguageOptionCodes, ContentText>>;
    // create a map from 'code' -> 'column number'
    const languageColumnMap = getLanguageColumnMap(rows[0]);
    return rows.reduce<LanguageMap>((obj, row) => {
        // determine which piece of content the row is for
        const contentTextField = row[0];

        // if not part of the content, skip
        if (!isContentTextKey(contentTextField)) return obj;
        
        // assign the value for all languages
        return LanguageOptions.reduce((prev, language) => {
            const columnForLanguage = languageColumnMap[language.code];
            if (columnForLanguage == null) return prev;
            const cellValue = row[columnForLanguage];
            const languageMapping = prev[language.code] ?? {};
            return {
                ...prev,
                [language.code]: {
                    ...languageMapping,
                    [contentTextField]: cellValue,
                },
            };
        }, obj);
    }, {});
}

async function generateLanguageContent() {
    const logger = scopedLogger('generateLanguageContent');
    // load the excel file
    const rows = await xlsxFile(getFullDataPath('./TranslatedContent.xlsx'));

    const data = loadTranslationsFromExcel(rows);
    
    await forEachAsync(LanguageOptions, async language => {
        const contentForLanguage = data[language.code];

        // warn and skip if no translations were found.
        if (contentForLanguage == null) {
            logger.error({
                language: language.code,
            }, 'Failed to find the translations for a language');
            return;
        }

        // submit them locally
        await sendRequest({
            url: 'http://localhost:5000/api/translatedContent/add',
            method: 'POST',
            body: JSON.stringify({
                title: WorkshopTitle,
                language: language.code,
                content: contentForLanguage,
            }),
        });
    });
}

await generateLanguageContent();
