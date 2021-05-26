const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const adminsRouter = require('./routes/admins');
const questionnaireResponsesRouter = require('./routes/questionnaireResponses');
const questionnairesRouter = require('./routes/questionnaires/questionnaires');
const translatedContentRouter = require('./routes/translatedContent/translatedContent');
const generateResponsesExcelRouter = require('./routes/generateResponsesExcel/generateResponsesExcel');

require('dotenv').config();

const MAX_EXCEL_FILE_SIZE = 50 * 1024 * 1024; //max size excel file in bytes will allow to be uploaded

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload( { limits: { fileSize: MAX_EXCEL_FILE_SIZE},}));

const uri = process.env.MONGO_URI;
console.log('connecting to', uri);
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});
app.get('/api/status', (req, res) => {
    res.sendStatus(200);
});
app.use('/api/users', usersRouter);
app.use('/api/admins', adminsRouter);
app.use('/api/questionnaire-responses', questionnaireResponsesRouter);
app.use('/api/questionnaires', questionnairesRouter);
app.use('/api/translatedContent', translatedContentRouter);
app.use('/api/generateExcel', generateResponsesExcelRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));
