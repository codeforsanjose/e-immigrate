// const hostName = process.env.HOSTNAME || 'http://localhost:5000';

export const apiUrls = {
    // adminsRouter
    ...{
        loginApi: '/api/admins/sessions',
        registerApi: '/api/admins',
        deleteApi: '/api/admins/:id',
        uploadQuestinnaires: '/api/admins/questionnairefile',
        getListOfQuestionnaires: '/api/admins/questionnaires',
        deleteQuestionnaireByTitle: '/api/admins/deletequestionnaire/:title',
    } as const,
    // usersRouter
    ...{
        getUsers: '/api/users',
        getUserById: '/api/users/:id',
        addUser: '/api/users/add',
        updateUser: '/api/users/update/:id',
        deleteUser: '/api/users/delete/:id',
    } as const,
    // generateResponsesExcelRouter
    ...{
        getReportById: '/api/generateExcel/get-report/:id',
        generateResponsesExcel: '/api/generateExcel/responses',
        getResponsesExcel: '/api/generateExcel/getLatest',
        deleteResponsesExcel: '/api/generateExcel/delete',
    } as const,
    // questionnaireResponsesRouter
    ...{
        getAllQuestionnaireResponse: '/api/questionnaire-responses',
        emailQuestionnaireResponse: '/api/questionnaire-responses/email',
        agencyAssignURL: '/api/questionnaire-responses/assign-agency',
        assignResponseFlag: '/api/questionnaire-responses/assign-flag',
        assignEmail: '/api/questionnaire-responses/assign-email',
        addQuestionnaireResponse: '/api/questionnaire-responses/add',
        deleteQuestionnaireResponse: '/api/questionnaire-responses/delete/:id',
    } as const,
    // questionnairesRouter
    ...{
        getQuestions: '/api/questionnaires',
        addQuestionnaires: '/api/questionnaires/add',
        deleteQuestionnaire: '/api/questionnaires/:id',
        getQuestionsByLanguage: '/api/questionnaires/:title.:language',
    } as const,
    // translatedContentRouter
    ...{
        getTranslatedContent: '/api/translatedContent',
        getTranslatedContentByLanguage: '/api/translatedContent/:title.:language',
    } as const,
};
