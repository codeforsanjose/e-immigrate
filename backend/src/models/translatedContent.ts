import mongoose from 'mongoose';
import { WithMongooseTimestamps } from './core/types.js';
import { ContentText } from '../types/ContentText.js';

export type TranslatedContentContentEntity = ContentText;
export type TranslatedContentEntity = WithMongooseTimestamps<{
    title?: string;
    language?: string;
    content: TranslatedContentContentEntity;
}>;

const translatedContentContentSchema = new mongoose.Schema<TranslatedContentContentEntity>({
    languageCode: { type: String, required: true, unique: false },
    buttonHome: { type: String, required: true, unique: false },
    buttonAbout: { type: String, required: true, unique: false },
    footerText1: { type: String, required: true, unique: false },
    footerText2: { type: String, required: true, unique: false },
    homeWelcomeMessage: { type: String, required: true, unique: false },
    homeHeader1: { type: String, required: true, unique: false },
    homeText1: { type: String, required: true, unique: false },
    homeHeader2: { type: String, required: true, unique: false },
    homeText2: { type: String, required: true, unique: false },
    homeText3: { type: String, required: true, unique: false },
    homeProceedButton: { type: String, required: true, unique: false },
    screeningHeader: { type: String, required: true, unique: false },
    screeningHeader2: { type: String, required: true, unique: false },
    errorMessage: { type: String, required: true, unique: false },
    screeningDate: { type: String, required: true, unique: false },
    screeningDateMarried: { type: String, required: true, unique: false },
    modalText1: { type: String, required: true, unique: false },
    modalText2: { type: String, required: true, unique: false },
    modalText3: { type: String, required: true, unique: false },
    modalText4: { type: String, required: true, unique: false },
    modalExitButton: { type: String, required: true, unique: false },
    screeningProceedButton: { type: String, required: true, unique: false },
    stepsHeader: { type: String, required: true, unique: false },
    stepsHeader2: { type: String, required: true, unique: false },
    stepsHeader3: { type: String, required: true, unique: false },
    stepsProceedButton: { type: String, required: true, unique: false },
    step1Header: { type: String, required: true, unique: false },
    step1Title: { type: String, required: true, unique: false },
    step1Instructions: { type: String, required: true, unique: false },
    step1VideoID: { type: String, required: true, unique: false },
    step1Tip1: { type: String, required: true, unique: false },
    step1Tip2: { type: String, required: true, unique: false },
    step1Ending: { type: String, required: true, unique: false },
    step1ProceedButton: { type: String, required: true, unique: false },
    step2Header: { type: String, required: true, unique: false },
    step2Title: { type: String, required: true, unique: false },
    step2Instructions: { type: String, required: true, unique: false },
    step2Tip1: { type: String, required: true, unique: false },
    step2Tip2: { type: String, required: true, unique: false },
    step2Header2: { type: String, required: true, unique: false },
    step2Tip4: { type: String, required: true, unique: false },
    step2Tip5: { type: String, required: true, unique: false },
    step2Tip6: { type: String, required: true, unique: false },
    step2ProceedButton1: { type: String, required: true, unique: false },
    step2ProceedButton2: { type: String, required: true, unique: false },
    step2ProceedButton3: { type: String, required: true, unique: false },
    step2Ending: { type: String, required: true, unique: false },
    step2ProceedButton4: { type: String, required: true, unique: false },
    step3Header: { type: String, required: true, unique: false },
    step3Title: { type: String, required: true, unique: false },
    step3Instructions: { type: String, required: true, unique: false },
    step3Header2: { type: String, required: true, unique: false },
    step3Text2: { type: String, required: true, unique: false },
    step3Header3: { type: String, required: true, unique: false },
    step3Text3: { type: String, required: true, unique: false },
    step3Tip1: { type: String, required: true, unique: false },
    step3Tip2: { type: String, required: true, unique: false },
    step3Tip3: { type: String, required: true, unique: false },
    step3Text4: { type: String, required: true, unique: false },
    step3Text5: { type: String, required: true, unique: false },
    step3Text6: { type: String, required: true, unique: false },
    progressBarHeader: { type: String, required: true, unique: false },
    errorMessageEmail: { type: String, required: true, unique: false },
    errorMessagePhone: { type: String, required: true, unique: false },
    errorMessageZip: { type: String, required: true, unique: false },
    required: { type: String, required: true, unique: false },
    optional: { type: String, required: true, unique: false },
    closedMessage: { type: String, required: true, unique: false },
    
});

const translatedContentSchema = new mongoose.Schema<TranslatedContentEntity>({
    title: { type: String, required: false, unique: false },
    language: { type: String, required: false, unique: false },
    content: { type: translatedContentContentSchema, required: true },
},
{
    timestamps: true,
});

export const TranslatedContent = mongoose.model<TranslatedContentEntity>(
    'TranslatedContent',
    translatedContentSchema
);
