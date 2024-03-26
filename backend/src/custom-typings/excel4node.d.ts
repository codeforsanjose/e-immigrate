type Style = unknown;
type LogFunction = (message?: any, ...optionalParams: any[]) => void;
type E4NLogger = {
    log: LogFunction;
    warn: LogFunction;
    error: LogFunction;
};
declare class MediaCollection {
    items: Array<string | Buffer>;
    constructor();

    add(item: string | Buffer): number;

    get isEmpty(): boolean;
}

type WorkbookConstructorOptions = {
    jszip?: {
        /**
         *  JSZip compression type. defaults to 'DEFLATE'
         *
         * @type {string}
         */
        compression: string;
    };
    defaultFont?: {
        /**
         *  HEX value of default font color. defaults to #000000
         *
         * @type {string}
         */
        color?: string;
        /**
         *  Font name. defaults to Calibri
         *
         * @type {string}
         */
        name?: string;
        /**
         *  Font size. defaults to 12
         *
         * @type {number}
         */
        size?: number;
        /**
         *  Font family. defaults to roman
         *
         * @type {string}
         */
        family?: string;
    };
    /**
     *  Specifies the format for dates in the Workbook. defaults to 'm/d/yy'
     *
     * @type {string}
     */
    dataFormat?: string;
    workbookView?: {
        // Specifies an unsignedInt that contains the index to the active sheet in this book view.
        activeTab: number;
        // Specifies a boolean value that indicates whether to group dates when presenting the user with filtering options in the user interface.
        autoFilterDateGrouping: boolean;
        // Specifies the index to the first sheet in this book view.
        firstSheet: number;
        // Specifies a boolean value that indicates whether the workbook window is minimized.
        minimized: boolean;
        // Specifies a boolean value that indicates whether to display the horizontal scroll bar in the user interface.
        showHorizontalScroll: boolean;
        // Specifies a boolean value that indicates whether to display the sheet tabs in the user interface.
        showSheetTabs: boolean;
        // Specifies a boolean value that indicates whether to display the vertical scroll bar.
        showVerticalScroll: boolean;
        // Specifies ratio between the workbook tabs bar and the horizontal scroll bar.
        tabRatio: number;
        // Specifies visible state of the workbook window. ('hidden', 'veryHidden', 'visible') (§18.18.89)
        visibility: string;
        // Specifies the height of the workbook window. The unit of measurement for this value is twips.
        windowHeight: number;
        // Specifies the width of the workbook window. The unit of measurement for this value is twips..
        windowWidth: number;
        // Specifies the X coordinate for the upper left corner of the workbook window. The unit of measurement for this value is twips.
        xWindow: number;
        // Specifies the Y coordinate for the upper left corner of the workbook window. The unit of measurement for this value is twips.
        yWindow: number;
    };
    // Logger that supports warn and error method, defaults to console
    logger?: unknown;
    // Name displayed as document's author
    author?: string;
};


type WorksheetConstructorOptions = {
    margins: {
        // Bottom margin in inches
        bottom: number;
        // Footer margin in inches
        footer: number;
        // Header margin in inches
        header: number;
        // Left margin in inches
        left: number;
        // Right margin in inches
        right: number;
        // Top margin in inches
        top: number;
    };
    printOptions: {
        // Should data be centered horizontally when printed
        centerHorizontal: boolean;
        // Should data be centered vertically when printed
        centerVertical: boolean;
        // Should gridlines by printed
        printGridLines: boolean;
        // Should Heading be printed
        printHeadings: boolean;
    };
    // Set Header and Footer strings and options. 
    headerFooter: {
        // Even footer text
        evenFooter: string;
         // Even header text
        evenHeader: string;
         // First footer text
        firstFooter: string;
         // First header text
        firstHeader: string;
         // Odd footer text
        oddFooter: string;
         // Odd header text
        oddHeader: string;
         // Should header/footer align with margins
        alignWithMargins: boolean;
         // Should header/footer show a different header/footer on first page
        differentFirst: boolean;
         // Should header/footer show a different header/footer on odd and even pages
        differentOddEven: boolean;
         // Should header/footer scale when doc zoom is changed
        scaleWithDoc: boolean;
    };
    pageSetup: {
        blackAndWhite: boolean;
        // one of 'none', 'asDisplayed', 'atEnd'
        cellComments: string;
        // How many copies to print
        copies: number;
        // Should quality be draft
        draft: boolean;
        // One of 'displayed', 'blank', 'dash', 'NA'
        errors: string;
        // Should the page number of the first page be printed
        firstPageNumber: number;
        // Number of vertical pages to fit to
        fitToHeight: number;
        // Number of horizontal pages to fit to
        fitToWidth: number;
        horizontalDpi: number;
        // One of 'default', 'portrait', 'landscape'
        orientation: string;
        // One of 'downThenOver', 'overThenDown'
        pageOrder: string;
        // Value must a positive Float immediately followed by unit of measure from list mm, cm, in, pt, pc, pi. i.e. '10.5cm'
        paperHeight: string;
        // see lib/types/paperSize.js for all types and descriptions of types. setting paperSize overrides paperHeight and paperWidth settings
        paperSize: string;
        // Value must a positive Float immediately followed by unit of measure from list mm, cm, in, pt, pc, pi. i.e. '10.5cm'
        paperWidth: string;
        // zoom of worksheet
        scale: number;
        useFirstPageNumber: boolean;
        usePrinterDefaults: boolean;
        verticalDpi: number;
    };
    sheetView: {
        pane: {
            // one of 'bottomLeft', 'bottomRight', 'topLeft', 'topRight'
            activePane: string;
            // ne of 'split', 'frozen', 'frozenSplit'
            state: string;
            // Cell Reference i.e. 'A1'
            topLeftCell: string;
            // Horizontal position of the split, in 1/20th of a point; 0 (zero) if none. If the pane is frozen, this value indicates the number of columns visible in the top pane.
            xSplit: string;
            // Vertical position of the split, in 1/20th of a point; 0 (zero) if none. If the pane is frozen, this value indicates the number of rows visible in the left pane.
            ySplit: string;
        };
        // Flag indicating whether the sheet is in 'right to left' display mode. When in this mode, Column A is on the far right, Column B ;is one column left of Column A, and so on. Also, information in cells is displayed in the Right to Left format.
        rightToLeft: boolean; 
        // Flag indicating whether the sheet should have gridlines enabled or disabled during view.
        showGridLines: boolean; 
        //  Defaults to 100
        zoomScale: number; 
        // Defaults to 100
        zoomScaleNormal: number; 
        // Defaults to 100
        zoomScalePageLayoutView: number; 
    };
    sheetFormat: {
        // Defaults to 10. Specifies the number of characters of the maximum digit width of the normal style's font. This value does not include margin padding or extra padding for gridlines. It is only the number of characters.,
        baseColWidth: number; 
        defaultColWidth: number; 
        defaultRowHeight: number; 
        // 'True' if rows have a thick bottom border by default.
        thickBottom: boolean; 
        // 'True' if rows have a thick top border by default.
        thickTop: boolean; 
    };
    // same as "Protect Sheet" in Review tab of Excel 
    sheetProtection: {
        // True means that that user will be unable to modify this setting
        autoFilter: boolean; 
        // True means that that user will be unable to modify this setting
        deleteColumns: boolean; 
        // True means that that user will be unable to modify this setting
        deleteRows: boolean; 
        // True means that that user will be unable to modify this setting
        formatCells: boolean; 
        // True means that that user will be unable to modify this setting
        formatColumns: boolean; 
        // True means that that user will be unable to modify this setting
        formatRows: boolean; 
        // True means that that user will be unable to modify this setting
        insertColumns: boolean; 
        // True means that that user will be unable to modify this setting
        insertHyperlinks: boolean; 
        // True means that that user will be unable to modify this setting
        insertRows: boolean; 
        // True means that that user will be unable to modify this setting
        objects: boolean; 
        // Password used to protect sheet
        password: string; 
        // True means that that user will be unable to modify this setting
        pivotTables: boolean; 
        // True means that that user will be unable to modify this setting
        scenarios: boolean; 
        // True means that that user will be unable to modify this setting
        selectLockedCells: boolean; 
        // True means that that user will be unable to modify this setting
        selectUnlockedCells: boolean; 
        // True means that that user will be unable to modify this setting
        sheet: boolean; 
        // True means that that user will be unable to modify this setting
        sort: boolean; 
    };
    outline: {
        // Flag indicating whether summary rows appear below detail in an outline, when applying an outline/grouping.
        summaryBelow: boolean; 
        // Flag indicating whether summary columns appear to the right of detail in an outline, when applying an outline/grouping.
        summaryRight: boolean; 
    };

    // Flag indicated whether to not include a spans attribute to the row definition in the XML. helps with very large documents.
    disableRowSpansOptimization: boolean;

    // Flag indicating whether to not hide the worksheet within the workbook.
    hidden: boolean;
};
type StyleConstructorOptions = {
    
};

type SimpleLoggerOptions = {

};
declare class SimpleLogger {
    logLevel: number;
    constructor(opts: SimpleLoggerOptions);
    debug(): void;
    log(): void;
    inspect(): void;
    info(): void;
    warn(): void;
    error(): void;
}

type DefinedNameOptions = {
    refFormula?: string;
    name?: string;
    comment?: string;
    customMenu?: string;
    description?: string;
    help?: string;
    statusBar?: string;
    localSheetId?: string;
    hidden?: string;
    function?: unknown;
    vbProcedure: unknown;
    xlm: unknown;
    functionGroupId: unknown;
    shortcutKey: unknown;
    publishToServer: unknown;
    workbookParameter: unknown;
};
declare class DefinedName {
    refFormula: string; //§18.2.5 definedName (Defined Name)
    name: string;
    comment: string;
    customMenu: string;
    description: string;
    help: string;
    statusBar: string;
    localSheetId: string;
    hidden: string;
    function: unknown;
    vbProcedure: {} | null;
    xlm: {} | null;
    functionGroupId: {} | null;
    shortcutKey: {} | null;
    publishToServer: {} | null;
    workbookParameter: {} | null;
    constructor(opts: DefinedNameOptions);

    addToXMLele(ele: xmlbuilder.XMLElement): void;
}
declare class DefinedNameCollection {
    items: Array<DefinedName>; 
    constructor();

    get length(): number;

    get isEmpty(): boolean;

    addDefinedName(opts: DefinedNameOptions): DefinedName;

    addToXMLele(ele: xmlbuilder.XMLElement): void;
}

declare class MediaCollection {
    items: Array<string | Buffer>;
    constructor();

    add(item: string | Buffer): number;

    get isEmpty(): boolean;
}

type StyleData = any;
declare class Workbook {
    logger: E4NLogger;
    opts: WorkbookConstructorOptions;
    author: string;
    sheets: Array<unknown>;
    sharedStrings: Array<unknown>;
    sharedStringLookup: Map<unknown, unknown>;
    styles: Array<unknown>;
    stylesLookup: Map<unknown, unknown>;
    definedNameCollection: DefinedNameCollection;
    mediaCollection: MediaCollection;
    dxfCollection: unknown;
    styleData: StyleData;
    styleDataLookup: Record<string, StyleData>;
    constructor(opts: WorkbookConstructorOptions = {});
    /**
     *
     *
     * @param {number} id tab number of sheet that should be displayed when workbook opens. tabs are indexed starting with 1
     * @memberof Workbook
     */
    setSelectedTab(id: number): void;
    /**
     *  Add a worksheet to the Workbook
     *
     * @param {string} name Name of the Worksheet
     * @param {WorksheetConstructorOptions} [opts]  Options for Worksheet. See Worksheet class definition
     * @return {*}  {Worksheet}
     * @memberof Workbook
     */
    addWorksheet(name: string, opts: WorksheetConstructorOptions = {}): Worksheet;
    /**
     *  Add a Style to the Workbook
     *
     * @param {unknown} opts  Options for the style. See Style class definition
     * @return {*}  {Style}
     * @memberof Workbook
     */
    createStyle(opts: StyleConstructorOptions = {}): Style;

    /**
     *  Gets the index of a string from the 
     * shared string array if exists and adds 
     * the string if it does not and returns 
     * the new index
     *
     * @param {string} val Text of string
     * @return {*}  {number} index of the string in the shared strings array
     * @memberof Workbook
     */
    getStringIndex(val: string): number;

    /**
     *  Generate .xlsx file.
     *
     * @param {string} fileName Name of Excel workbook with .xslx extension
     * @param {unknown} handler response object or callback function (optional).
     * @memberof Workbook
     */
    write(fileName: string, handler?: unknown): Promise<void>;

    /**
     *  Writes Excel data to a node Buffer.
     *
     * @return {*}  {Promise<Buffer>}
     * @memberof Workbook
     */
    writeToBuffer(): Promise<Buffer>;

    /**
     *
     * @function Workbook._generateXML
     * @description used for testing the Workbook XML generated by the builder
     * @return {*}  {Promise<unknown>} resolves with Workbook XML 
     * @memberof Workbook
     */
    _generateXML(): Promise<unknown>;
}
declare class Cell {
    string(value: string | null | undefined): this;
    style(value: Style): this;
}
declare class Worksheet {
    constructor(opts: WorksheetConstructorOptions = {});
    addWorksheet(name: string, opts?: unknown);
    cell(row1: number, col1: number, row2?: number, col2?: number, isMerged?: boolean): Cell;
}
export default {
    Workbook,
    Worksheet,
    Cell,
}