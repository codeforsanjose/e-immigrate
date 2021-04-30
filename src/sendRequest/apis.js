module.exports = {
    loginApi: 'http://localhost:5000/api/admins/sessions',
    registerApi: 'http://localhost:5000/api/admins',
    deleteApi: 'http://localhost:5000/api/admins/:id',
    getUsers: 'http://localhost:5000/api/users',
    getQuestionnaireResponse:
        'http://localhost:5000/api/questionnaire-responses',
    emailQuestionnaireResponse:
        'http://localhost:5000/api/questionnaire-responses/email',
    downloadStatusQuestionnaireResponse:
        'http://localhost:5000/api/questionnaire-responses/excel-download-status',
    agencyAssignURL:
        'http://localhost:5000/api/questionnaire-responses/assign-agency',
    getUserById: 'http://localhost:5000/api/users/:id',
    addUser: 'http://localhost:5000/api/users/add',
    updateUser: 'http://localhost:5000/api/users/update/:id',
    deleteUser: 'http://localhost:5000/api/users/delete/:id',
    addQuestionnaireResponse:
        'http://localhost:5000/api/questionnaire-responses/add',
    addQuestionnaires: 'http://localhost:5000/api/questionnaires/add',
    deleteQuestionnaire: 'http://localhost:5000/api/questionnaires/delete/:id',
    getQuestions: 'http://localhost:5000/api/questionnaires',
    getTranslatedContent: 'http://localhost:5000/api/translatedContent',
    generateResponsesExcel: 'http://localhost:5000/api/generateExcel/responses',
    getResponsesExcel: 'http://localhost:5000/api/generateExcel/getLatest',
    deleteResponsesExcel: 'http://localhost:5000/api/generateExcel/delete',
};
