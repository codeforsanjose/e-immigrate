export type ContentText = {
    languageCode: string;
    buttonHome: string;
    buttonAbout: string;
    footerText1: string;
    footerText2: string;
    homeWelcomeMessage: string;
    homeHeader1: string;
    homeText1: string;
    homeHeader2: string;
    homeText2: string;
    homeText3: string;
    homeProceedButton: string;
    screeningHeader: string;
    screeningHeader2: string;
    errorMessage: string;
    screeningDate: string;
    screeningDateMarried: string;
    modalText1: string;
    modalText2: string;
    modalText3: string;
    modalText4: string;
    modalExitButton: string;
    screeningProceedButton: string;
    stepsHeader: string;
    stepsHeader2: string;
    stepsHeader3: string;
    stepsProceedButton: string;
    step1Header: string;
    step1Title: string;
    step1Instructions: string;
    step1VideoID: string;
    step1Tip1: string;
    step1Tip2: string;
    step1Ending: string;
    step1ProceedButton: string;
    step2Header: string;
    step2Title: string;
    step2Instructions: string;
    step2Tip1: string;
    step2Tip2: string;
    step2Header2: string;
    step2Tip4: string;
    step2Tip5: string;
    step2Tip6: string;
    step2ProceedButton1: string;
    step2ProceedButton2: string;
    step2ProceedButton3: string;
    step2Ending: string;
    step2ProceedButton4: string;
    step3Header: string;
    step3Title: string;
    step3Instructions: string;
    step3Header2: string;
    step3Text2: string;
    step3Header3: string;
    step3Text3: string;
    step3Tip1: string;
    step3Tip2: string;
    step3Tip3: string;
    step3Text4: string;
    step3Text5: string;
    step3Text6: string;
    progressBarHeader: string;
    errorMessageEmail: string;
    errorMessagePhone: string;
    errorMessageZip: string;
    required: string;
    optional: string;
    closedMessage: string;
};

export type ErrorMessageOnlyContentText = Pick<ContentText, 'errorMessage'>;

export const missingContentText: ContentText = {
    buttonAbout: `missing 'buttonAbout'`,
    buttonHome: `missing 'buttonHome'`,
    languageCode: `missing 'languageCode'`,
    footerText1: `missing 'footerText1'`,
    footerText2: `missing 'footerText2'`,
    homeWelcomeMessage: `missing 'homeWelcomeMessage'`,
    homeHeader1: `missing 'homeHeader1'`,
    homeText1: `missing 'homeText1'`,
    homeHeader2: `missing 'homeHeader2'`,
    homeText2: `missing 'homeText2'`,
    homeText3: `missing 'homeText3'`,
    homeProceedButton: `missing 'homeProceedButton'`,
    screeningHeader: `missing 'screeningHeader'`,
    screeningHeader2: `missing 'screeningHeader2'`,
    errorMessage: `missing 'errorMessage'`,
    screeningDate: `missing 'screeningDate'`,
    screeningDateMarried: `missing 'screeningDateMarried'`,
    modalText1: `missing 'modalText1'`,
    modalText2: `missing 'modalText2'`,
    modalText3: `missing 'modalText3'`,
    modalText4: `missing 'modalText4'`,
    modalExitButton: `missing 'modalExitButton'`,
    screeningProceedButton: `missing 'screeningProceedButton'`,
    stepsHeader: `missing 'stepsHeader'`,
    stepsHeader2: `missing 'stepsHeader2'`,
    stepsHeader3: `missing 'stepsHeader3'`,
    stepsProceedButton: `missing 'stepsProceedButton'`,
    step1Header: `missing 'step1Header'`,
    step1Title: `missing 'step1Title'`,
    step1Instructions: `missing 'step1Instructions'`,
    step1VideoID: `missing 'step1VideoID'`,
    step1Tip1: `missing 'step1Tip1'`,
    step1Tip2: `missing 'step1Tip2'`,
    step1Ending: `missing 'step1Ending'`,
    step1ProceedButton: `missing 'step1ProceedButton'`,
    step2Header: `missing 'step2Header'`,
    step2Title: `missing 'step2Title'`,
    step2Instructions: `missing 'step2Instructions'`,
    step2Tip1: `missing 'step2Tip1'`,
    step2Tip2: `missing 'step2Tip2'`,
    step2Header2: `missing 'step2Header2'`,
    step2Tip4: `missing 'step2Tip4'`,
    step2Tip5: `missing 'step2Tip5'`,
    step2Tip6: `missing 'step2Tip6'`,
    step2ProceedButton1: `missing 'step2ProceedButton1'`,
    step2ProceedButton2: `missing 'step2ProceedButton2'`,
    step2ProceedButton3: `missing 'step2ProceedButton3'`,
    step2Ending: `missing 'step2Ending'`,
    step2ProceedButton4: `missing 'step2ProceedButton4'`,
    step3Header: `missing 'step3Header'`,
    step3Title: `missing 'step3Title'`,
    step3Instructions: `missing 'step3Instructions'`,
    step3Header2: `missing 'step3Header2'`,
    step3Text2: `missing 'step3Text2'`,
    step3Header3: `missing 'step3Header3'`,
    step3Text3: `missing 'step3Text3'`,
    step3Tip1: `missing 'step3Tip1'`,
    step3Tip2: `missing 'step3Tip2'`,
    step3Tip3: `missing 'step3Tip3'`,
    step3Text4: `missing 'step3Text4'`,
    step3Text5: `missing 'step3Text5'`,
    step3Text6: `missing 'step3Text6'`,
    progressBarHeader: `missing 'progressBarHeader'`,
    errorMessageEmail: `missing 'errorMessageEmail'`,
    errorMessagePhone: `missing 'errorMessagePhone'`,
    errorMessageZip: `missing 'errorMessageZip'`,
    required: `missing 'required'`,
    optional: `missing 'optional'`,
    closedMessage: `missing 'closedMessage'`,
};