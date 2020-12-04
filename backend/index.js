const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const adminsRouter = require('./routes/admins');
const questionnaireResponsesRouter = require('./routes/questionairResponses');
const xlsxFile = require('read-excel-file/node');
const fs = require('fs');

xlsxFile('../src/data/questions/Questionnaire for Upload.xlsx').then((rows) => {
    const data = [];
    rows.forEach((row) => {
        data.push({
            number: row[0],
            category: row[1],
            text: row[2],
            questionType: row[3],
            answerType: row[4],
            required: row[5] === 'Yes' ? true : false,
            followUp: row[6],
        });
    });

    data.shift();

    fs.writeFile(
        '../src/data/questions/Questions.js',
        `export const questions = ${JSON.stringify(data)}`,
        (err) => {
            if (err) return console.log(err);
            console.log('Question data written to file');
        }
    );
});

xlsxFile('../src/data/content/Language Content.xlsx').then((rows) => {
    const data = {};
    rows.forEach((row) => {
        data[row[0]] = {
            en: row[1],
            es: row[2],
            vi: row[3],
        };
    });

    fs.writeFile(
        '../src/data/content/Content.js',
        `export const content = ${JSON.stringify(data)}`,
        (err) => {
            if (err) return console.log(err);
            console.log('Language content data written to file');
        }
    );
});

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

app.use('/api/users', usersRouter);
app.use('/api/admins', adminsRouter);
app.use('/api/questionnaire-responses', questionnaireResponsesRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));
