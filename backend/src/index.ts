import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import { usersRouter } from './routes/users.js';
import { adminsRouter }  from './routes/admins.js';
import { questionnaireResponsesRouter } from './routes/questionnaireResponses.js';
import { questionnairesRouter } from './routes/questionnaires/questionnaires.js';
import { translatedContentRouter } from './routes/translatedContent/translatedContent.js';
import { generateResponsesExcelRouter } from './routes/generateResponsesExcel.js';
import dotenv from 'dotenv';
import { handleRequestErrorMiddleware } from './middleware/error-middleware/handleRequestErrorMiddleware.js';
import { handleUncaughtErrorMiddleware } from './middleware/error-middleware/handleUncaughtErrorMiddleware.js';
import { getRequiredEnvironmentVariable } from './features/environmentVariables/index.js';
dotenv.config();

const MAX_EXCEL_FILE_SIZE = 50 * 1024 * 1024; //max size excel file in bytes will allow to be uploaded

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({ limits: { fileSize: MAX_EXCEL_FILE_SIZE } }));


function getPort(defaultPort = 5000) {
    const port = process.env.PORT;
    if (port == null) return defaultPort;
    else if (typeof port === 'number') return port;
    const numericPort = parseInt(port);
    if (isNaN(numericPort)) return defaultPort;
    return port;
}


const appPort = getPort();
const mongoUri = getRequiredEnvironmentVariable('MONGO_URI')

console.log('connecting to', mongoUri);
mongoose.connect(mongoUri, {
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

app.listen(appPort, () => {
    console.log(`listening on port ${appPort}`);
});
