const hostName = process.env.HOSTNAME || 'http://localhost:5000';

module.exports = {
    loginApi: '/api/admins/sessions',
    registerApi: '/api/admins',
    deleteApi: '/api/admins/:id',
    getUsers: '/api/users',
    getQuestionnaireResponse: '/api/questionnaire-responses',
    emailQuestionnaireResponse: '/api/questionnaire-responses/email',
    downloadStatusQuestionnaireResponse:
        '/api/questionnaire-responses/excel-download-status',
    agencyAssignURL: '/api/questionnaire-responses/assign-agency',
    getUserById: '/api/users/:id',
    addUser: '/api/users/add',
    updateUser: '/api/users/update/:id',
    deleteUser: '/api/users/delete/:id',
    addQuestionnaireResponse: '/api/questionnaire-responses/add',
    deleteQuestionnaireResponse: '/api/questionnaire-responses/delete/:id',
    addQuestionnaires: '/api/questionnaires/add',
    deleteQuestionnaire: '/api/questionnaires/delete/:id',
    getQuestions: '/api/questionnaires',
    getTranslatedContent: '/api/translatedContent',
    generateResponsesExcel: '/api/generateExcel/responses',
    getResponsesExcel: '/api/generateExcel/getLatest',
    deleteResponsesExcel: '/api/generateExcel/delete',
};
