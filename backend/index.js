const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const adminsRouter = require('./routes/admins');
const questionnaireResponsesRouter = require('./routes/questionnaireResponses');
const questionnairesRouter = require('./routes/questionnaires/questionnaires');
const translatedContentRouter = require('./routes/translatedContent/translatedContent');
const generateResponsesExcelRouter = require('./routes/generateResponsesExcel/generateResponsesExcel');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
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
    res.status(200);
});
app.use('/api/users', usersRouter);
app.use('/api/admins', adminsRouter);
app.use('/api/questionnaire-responses', questionnaireResponsesRouter);
app.use('/api/questionnaires', questionnairesRouter);
app.use('/api/translatedContent', translatedContentRouter);
app.use('/api/generateExcel', generateResponsesExcelRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));
