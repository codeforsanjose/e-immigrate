const express = require('express');
const router = express.Router();
const Questionnaires = require('../models/questionnaires');
const xlsxFile = require('read-excel-file/node');

router.route('/').get((req, res) => {
    Questionnaires.find()
        .then((allResponses) => {
            const responsesInfo = { responses: allResponses };
            res.json(responsesInfo);
        })
        .catch((err) => console.log(err));
});

router.route('/:id').get((req, res) => {
    Questionnaire.findById(req.params.id)
        .then((questionnaires) => res.json(questionnaires))
        .catch((err) => console.log(err));
});

router.route('/add').post((req, res) => {
    const questionnaires = req.body.questionnaires;

    const data = [];
    xlsxFile('../src/data/questions/Questionnaire for Upload.xlsx').then(
        (rows) => {
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

            // fs.writeFile(
            //     '../src/data/questions/Questions.js',
            //     `export const questions = ${JSON.stringify(data)}`,
            //     (err) => {
            //         if (err) return console.log(err);
            //         console.log('Data written to file');
            //     }
            // );
        }
    );

    const newQuestionnaires = new Questionnaire({
        data,
    });

    newQuestionnaires
        .save()
        .then(() => res.json('questionnaires added'))
        .catch((err) => console.log(err));
});

router.route('/:id').delete((req, res) => {
    Questionnaires.findByIdAndDelete(req.params.id)
        .then(() => res.json('questionnaires Deleted'))
        .catch((err) => console.log(err));
});

router.route('');

module.exports = router;
