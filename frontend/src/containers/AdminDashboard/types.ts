
export type QuestionnaireResponseElement = {
    _id: string;
    responseDownloadedToExcel: boolean;
    questionnaireResponse: Record<string, string | null>;
    flagOverride?: boolean;
    flag?: boolean;
    agency: string;
    emailSent?: boolean;
    createdAt: number | Date;
    updatedAt: number | Date;
};