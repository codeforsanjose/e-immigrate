import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import { usersRouter } from './routes/users.js';
import { adminsRouter }  from './routes/admins.js';
import { questionnaireResponsesRouter } from './routes/questionnaireResponses.js';
import { questionnairesRouter } from './routes/questionnaires/questionnaires.js';
import { translatedContentRouter } from './routes/translatedContent/translatedContent.js';
import { generateResponsesExcelRouter } from './routes/generateResponsesExcel/generateResponsesExcel.js';
import dotenv from 'dotenv';
import { handleRequestErrorMiddleware } from './middleware/error-middleware/handleRequestErrorMiddleware.js';
import { handleUncaughtErrorMiddleware } from './middleware/error-middleware/handleUncaughtErrorMiddleware.js';
dotenv.config();

const MAX_EXCEL_FILE_SIZE = 50 * 1024 * 1024; //max size excel file in bytes will allow to be uploaded

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({ limits: { fileSize: MAX_EXCEL_FILE_SIZE } }));

const uri = process.env.MONGO_URI;
if (uri == null || uri === '') throw new Error(`Missing the 'MONGO_URI' environment variable`);
console.log('connecting to', uri);
mongoose.connect(uri, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
} satisfies ConnectOptions);
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

// Error middleware, the earlier ones are run first
app.use(...[
    handleRequestErrorMiddleware(),
    handleUncaughtErrorMiddleware(),
])
app.use(express.static('build'))
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
