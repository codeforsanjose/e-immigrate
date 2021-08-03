const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');
const Questionnaires = require('../models/questionnaires');
const mongoose = require('mongoose');

const {
    loadQuestionnaireXlsxIntoDB,
    loadTranslationXlsxIntoDB,
} = require('./excelToDb');

const SALT_ROUNDS = 10;
const ERRMSG = { error: { message: 'Not logged in or auth failed' } };
const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

router.route('/').get((req, res) => {
    Admin.find()
        .then((admins) => {
            let allAdmins = JSON.parse(JSON.stringify(admins));
            allAdmins.forEach((admin) => {
                delete admin['password'];
            });
            return res.json(allAdmins);
        })
        .catch((err) => res.status(500).json(err));
});

//route to sign up
router.route('/').post((req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;

    Admin.find({ email: email })
        .exec()
        .then((admins) => {
            if (admins.length >= 1) {
                return res.status(409).json({
                    message: 'admin email exists',
                });
            } else {
                if (!name) {
                    return res
                        .status(400)
                        .json({ error: { message: 'name not entered! ' } });
                } else if (!EMAIL_REGEX.test(email)) {
                    return res
                        .status(400)
                        .json({ error: { message: 'Invalid email.' } });
                } else {
                    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err,
                            });
                        } else {
                            const admin = new Admin({
                                _id: new mongoose.Types.ObjectId(),
                                email: email,
                                name: name,
                                password: hash,
                            });

                            admin
                                .save()
                                .then((result) => {
                                    console.log(result);
                                })
                                .catch((err) => {
                                    if (err) {
                                        console.log(err);
                                        return res.status(500).json({
                                            error: {
                                                message: 'Sign up failed',
                                            },
                                        });
                                    }
                                });

                            let jwToken = jwt.sign(
                                { email: email },
                                process.env.JWT_KEY
                            );
                            return res.status(201).json({
                                name: name,
                                email: email,
                                jwt: jwToken,
                            });
                        }
                    });
                }
            }
        })
        .catch((err) => {
            return res.json(err);
        });
});

//route for logging in with email and password
router.route('/sessions').post((req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!password || !email) {
        return res.status(404).json(ERRMSG);
    } else {
        Admin.findOne({ email: email })
            .exec()
            .then((admin) => {
                let hashPw = admin.password;
                bcrypt.compare(password, hashPw, (err, result) => {
                    // if passwords matches, result will be truthy
                    if (err) {
                        console.log(err);
                        return res.status(500).json(ERRMSG);
                    }

                    if (result) {
                        let jwToken = jwt.sign(
                            { email: email },
                            process.env.JWT_KEY
                        );
                        return res.status(200).json({
                            name: admin.name,
                            email: email,
                            jwt: jwToken,
                        });
                    } else {
                        return res.status(500).json(ERRMSG);
                    }
                });
            });
    }
});

router.route('/:id').delete((req, res) => {
    Admin.remove({ _id: req.params.id })
        .exec()
        .then((result) => {
            return res.status(200).json({
                message: 'admin deleted',
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                error: err,
            });
        });
});

/**
 * verify that the http request comes from a admin user
 * detect the user from the body containing the JWT token
 * respond the request with an error if the token is missing or the user identified
 * in token is not an admin user
 * call the isAdminCallBack function if the user is an admin
 **/
function enforceAdminOnly(req, res, isAdminCallBack) {
    //verify the request has a jwtToken beloning to an Admin User
    if (!req.body || !req.body.jwToken) {
        return res
            .status(401)
            .json({ error: { message: 'Missing JWT Token' } });
    }
    jwt.verify(req.body.jwToken, process.env.JWT_KEY, function (err, token) {
        if (err) {
            return res
                .status(401)
                .json({ error: { message: 'Invalid JWT Token' } });
        }
        Admin.findOne({ email: token.email }).exec((error, admin) => {
            if (error || !admin) {
                return res
                    .status(401)
                    .json({ error: { message: 'Invalid Admin User' } });
            }
            isAdminCallBack();
        });
    });
}
//route for uploading the questionnaires spreadsheet in the database
router.route('/questionnairefile').post((req, res) => {
    enforceAdminOnly(req, res, processQuestionnaireAsAdmin);
    function processQuestionnaireAsAdmin() {
        console.log(req.files, req.body);
        if (!req.files || !req.files.questionnaire) {
            return res
                .status(400)
                .json({ error: { message: 'Missing Questionnaire File' } });
        }
        if (req.files.questionnaire.truncated) {
            return res.status(400).json({
                error: { message: 'Questionnaire File is too large' },
            });
        }
        const excelFileContent = req.files.questionnaire.data;
        const title = req.body.title;
        return loadQuestionnaireXlsxIntoDB(excelFileContent, title)
            .then(() => {
                res.status(200).json({
                    message: 'Questionnaire Documenent Recieved',
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    message: 'Error, Storing Questionnaire in database',
                });
            });
    }
});
//route for deleteing a questionnaire by title
router.route('/deletequestionnaire/:title').delete((req, res) => {
    enforceAdminOnly(req, res, deleteQuestionnaireByTitle);
    function deleteQuestionnaireByTitle() {
        return Questionnaires.deleteMany({
            title: decodeURIComponent(req.params.title),
        })
            .then((results) => {
                if (!results.ok) {
                    console.log('Delete Failed');
                    res.status(500).json({ message: 'Delete Failed' });
                    return;
                }
                if (result.deletedCount === 0) {
                    res.status(404).json({ message: 'Title not found' });
                    return;
                }

                res.status(200).json({ message: 'Questionnaire Removed' });
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error, Deleting Questionnaires from database',
                });
            });
    }
});
//route for uploading the translation spreadsheet in the database
router.route('/translateContent').post((req, res) => {
    enforceAdminOnly(req, res, processTranslatedContentAsAdmin);
    function processTranslatedContentAsAdmin() {
        if (!req.files || !req.files.translations) {
            return res
                .status(400)
                .json({ error: { message: 'Missing Translation File' } });
        }
        if (req.files.translations.truncated) {
            return res
                .status(400)
                .json({ error: { message: 'Translation File is too large' } });
        }
        const excelFileContent = req.files.translations.data;
        return loadTranslationXlsxIntoDB(excelFileContent)
            .then(() => {
                res.status(200).send('Translation Document Recieved');
            })
            .catch((err) => {
                res.status(500).send('Error, Storing Translation in database');
            });
    }
});

router.route('');

module.exports = router;
