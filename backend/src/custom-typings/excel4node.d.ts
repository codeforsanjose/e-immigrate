import {} from 'excel4node/distribution/index.js';
type Style = unknown;
declare class Workbook {
    addWorksheet(name: string, opts?: unknown): Worksheet;
    createStyle(opts: unknown): Style;
    /**
     *  Generate .xlsx file.
     *
     * @param {string} fileName Name of Excel workbook with .xslx extension
     * @memberof Workbook
     */
    write(fileName: string, http?: unknown);

    writeToBuffer(): Promise<Buffer>;
}
declare class Cell {
    string(value: string | null | undefined): this;
    style(value: Style): this;
}
declare class Worksheet {
    addWorksheet(name: string, opts?: unknown);
    cell(row1: number, col1: number, row2?: number, col2?: number, isMerged?: boolean): Cell;
}
export default {
    Workbook,
    Worksheet,
    Cell,
}