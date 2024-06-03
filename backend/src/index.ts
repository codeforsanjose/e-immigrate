import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import 'express-async-errors';
import { usersRouter } from './routes/users.js';
import { adminsRouter } from './routes/adminsRouter.js';
import { questionnaireResponsesRouter } from './routes/questionnaireResponsesRouter.js';
import { mersReportingQuestionnaireResponsesRouter } from './routes/mersResportingResponseRouter.js';
import { questionnairesRouter } from './routes/questionnairesRouter.js';
import { translatedContentRouter } from './routes/translatedContentRouter.js';
import { generateResponsesExcelRouter } from './routes/generateResponsesExcelRouter.js';
import { handleRequestErrorMiddleware } from './middleware/error-middleware/handleRequestErrorMiddleware.js';
import { handleUncaughtErrorMiddleware } from './middleware/error-middleware/handleUncaughtErrorMiddleware.js';
import { getRequiredEnvironmentVariable } from './features/environmentVariables/index.js';
import { handleZodErrorMiddleware } from './middleware/error-middleware/handleZodErrorMiddleware.js';
import { handleAuthorizationErrorMiddleware } from './middleware/error-middleware/handleAuthorizationErrorMiddleware.js';
import { logger } from './features/logging/logger.js';
dotenv.config();

const MAX_EXCEL_FILE_SIZE = 50 * 1024 * 1024; // max size excel file in bytes will allow to be uploaded

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({ limits: { fileSize: MAX_EXCEL_FILE_SIZE } }));

function getPort(defaultPort = 3001) {
    const port = process.env.PORT;
    if (port == null) return defaultPort;
    else if (typeof port === 'number') return port;
    const numericPort = parseInt(port);
    if (isNaN(numericPort)) return defaultPort;
    return port;
}

const appPort = getPort();
const mongoUri = getRequiredEnvironmentVariable('MONGO_URI');

logger.info(`connecting to mongo url: '${mongoUri}'`);
mongoose.connect(mongoUri, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
} satisfies ConnectOptions);
const connection = mongoose.connection;
connection.on('error', () => {
    logger.error('connection error:');
});
connection.once('open', () => {
    logger.info('MongoDB database connection established successfully');
});
app.get('/api/status', (req, res) => {
    res.sendStatus(200);
});
app.use('/api/users', usersRouter);
app.use('/api/admins', adminsRouter);
app.use('/api/questionnaire-responses', questionnaireResponsesRouter);
app.use('/api/mers-reporting', mersReportingQuestionnaireResponsesRouter);
app.use('/api/questionnaires', questionnairesRouter);
app.use('/api/translatedContent', translatedContentRouter);
app.use('/api/generateExcel', generateResponsesExcelRouter);


app.use(express.static('build'));
// Error middleware, the earlier ones are run first
app.use(...[
    handleZodErrorMiddleware(),
    handleAuthorizationErrorMiddleware(),
    handleRequestErrorMiddleware(),
    handleUncaughtErrorMiddleware(),
]);
app.listen(appPort, () => {
    logger.info(`listening on port ${appPort}`);
});
