import express from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { Admin } from '../models/admin.js';
import { Questionnaires } from '../models/questionnaires.js';
import mongoose from 'mongoose';

import { loadQuestionnaireXlsxIntoDB, loadTranslationXlsxIntoDB } from './excelToDb.js';

import { authMiddleware } from '../middleware/auth.js';
import { getRequiredJwtKey } from '../features/jwtKey/access.js';
import { z } from 'zod';
const router = express.Router();
export { router as adminsRouter }
const SALT_ROUNDS = 10;
const ERRMSG = { error: { message: 'Not logged in or auth failed' } };
const EMAIL_REGEX =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;


router.route('/').get((req, res) => {
    Admin.find()
        .then((admins) => {
            let allAdmins: Array<{ password?: unknown }> = JSON.parse(JSON.stringify(admins));
            allAdmins.forEach((admin) => {
                delete admin['password'];
            });
            return res.json(allAdmins);
        })
        .catch((err) => res.status(500).json(err));
});

const RegisterSchema = z.object({
    email: z.string(),
    name: z.string(),
    password: z.string(),
});
//route to sign up
router.route('/').post(async (req, res) => {
    const reqBody = RegisterSchema.parse(req.body);
    const {
        email,
        name,
        password,
    } = reqBody;

    if (name == null || name === '') {
        return res
            .status(400)
            .json({ error: { message: 'name not entered! ' } });
    } 
    else if (!EMAIL_REGEX.test(email)) {
        return res
            .status(400)
            .json({ error: { message: 'Invalid email.' } });
    }

    try {

        const admins = await Admin.find({ email: email }).exec();
        if (admins.length >= 1) {
            return res.status(409).json({
                message: 'admin email exists',
            });
        }
        let hash: string;
        try {
            hash = await bcrypt.hash(password, SALT_ROUNDS);
        }
        catch (err) {
            return res.status(500).json({
                error: err,
            });
        }

        const admin = new Admin({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            name: name,
            password: hash,
        });

        try {

            
            const result = await admin.save();
            console.log(
                'newly created admin user: ',
                result
            );
            let jwToken = jwt.sign(
                { email: email },
                getRequiredJwtKey()
            );
            return res.status(201).json({
                name: name,
                email: email,
                jwt: jwToken,
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                error: {
                    message: 'Sign up failed',
                },
            });
        }
    }
    catch (err) {
        console.error('error!', { err });
        return res.json(err);
    }

});

//route for logging in with email and password
router.route('/sessions').post(async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!password || !email) {
        return res.status(404).json(ERRMSG);
    }
    const admin = await Admin.findOne({ email: email }).exec();
    if (admin == null) {
        console.error(`Failed to find admin`);
        return;
    };

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
                getRequiredJwtKey()
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

router.route('/:id').delete(async (req, res) => {
    try {
        const result = await Admin.deleteOne({ _id: req.params.id }).exec();
        if (result == null) {
            console.error(`Failed to find the admin with id '${req.params.id}'`);
            return;
        }
        return res.status(200).json({
            message: 'admin deleted',
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
});


function verifyJwtAsync(userToken: string): Promise<string | jwt.JwtPayload | undefined> {
    return new Promise((resolve, reject) => {
        jwt.verify(userToken, getRequiredJwtKey(), (err, data) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(data);
        });

        // if (err) {
        //     return res
        //         .status(401)
        //         .json({ error: { message: 'Invalid JWT Token' } });
        // }
        // Admin.findOne({ email: token.email }).exec((error, admin) => {
        //     if (error || !admin) {
        //         return res
        //             .status(401)
        //             .json({ error: { message: 'Invalid Admin User' } });
        //     }
        //     isAdminCallBack();
        // });
        // });
    })
}
type IsAdminCallBack<T> =
    | (() => Promise<T>)
    | (() => T)
/**
 * verify that the http request comes from a admin user
 * detect the user from the body containing the JWT token
 * respond the request with an error if the token is missing or the user identified
 * in token is not an admin user
 * call the isAdminCallBack function if the user is an admin
 **/
async function enforceAdminOnly<TResult>(req: express.Request, res: express.Response, isAdminCallBack: IsAdminCallBack<TResult>) {
    //verify the request has a jwtToken beloning to an Admin User
    if (!req.body || !req.body.jwToken) {
        return res
            .status(401)
            .json({ error: { message: 'Missing JWT Token' } });
    }
    try {


        const token = await verifyJwtAsync(req.body.jwToken);
        if (token == null || typeof token === 'string') {
            return res
                .status(401)
                .json({ error: { message: 'Invalid JWT Token' } });
        }
        const admin = await Admin.findOne({ email: token.email }).exec();
        if (admin == null) {
            return res
                .status(401)
                .json({ error: { message: 'Invalid Admin User' } });
        }

        isAdminCallBack();
    }
    catch (err) {
        return res
            .status(401)
            .json({ error: { message: 'Invalid JWT Token' } });
    }
}
//route for uploading the questionnaires spreadsheet in the database
router.route('/questionnairefile').post((req, res) => {
    enforceAdminOnly(req, res, processQuestionnaireAsAdmin);
    function processQuestionnaireAsAdmin() {
        console.log(req.files, req.body);
        if (!req.files) {
            return res
                .status(400)
                .json({ error: { message: 'Missing Questionnaire File' } });
        }
        const { questionnaire: questionnairefile } = req.files;
        if (questionnairefile == null || Array.isArray(questionnairefile)) {
            return res
                .status(400)
                .json({ error: { message: 'Missing Questionnaire File' } });
        }
        if (questionnairefile.truncated) {
            return res.status(400).json({
                error: { message: 'Questionnaire File is too large' },
            });
        }
        const excelFileContent = questionnairefile.data;
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
                if (!results.acknowledged) {
                    console.log('Delete Failed');
                    res.status(500).json({ message: 'Delete Failed' });
                    return;
                }
                if (results.deletedCount === 0) {
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
        if (!req.files) {
            return res
                .status(400)
                .json({ error: { message: 'Missing Translation File' } });
        }
        const { translations: translationsFile } = req.files;
        if (translationsFile == null || Array.isArray(translationsFile)) {
            return res
                .status(400)
                .json({ error: { message: 'Missing Translation File' } });
        }
        if (translationsFile.truncated) {
            return res
                .status(400)
                .json({ error: { message: 'Translation File is too large' } });
        }
        const excelFileContent = translationsFile.data;
        return loadTranslationXlsxIntoDB(excelFileContent)
            .then(() => {
                res.status(200).send('Translation Document Recieved');
            })
            .catch((err) => {
                res.status(500).send('Error, Storing Translation in database');
            });
    }
});


router.use(authMiddleware); //all apis AFTER this line will require authentication as implemented in auth.js

//set one or more admins to be super admins:
//request body looks like the following:
//  {"admins":["abcde@gmail.com", "xyz@123.org"]}
router.route('/super').post((req, res) => {
    if (!req.body || !req.body.admins) {
        return res.status(400).json('Admin identifiers not found');
    }
    Admin.updateMany({ email: { $in: req.body.admins } }, { issuper: true })
        .exec()
        .then((result) => {
            return res
                .status(200)
                .json(
                    'Admins to super status - ' +
                    result.matchedCount +
                    ' selected, ' +
                    result.modifiedCount +
                    ' updated'
                );
        })
        .catch((err) => {
            console.log(req.body, err);
            return res.status(500).json('Error updating super admin status');
        });
});


//link questionnaires to admin identified by email
async function updateLinks(email: string, titles: Array<string>, insert = true) {
    try {

        const optAdmin = await Admin.findOne({ email: email }).exec();
        if (optAdmin == null) return;
        const existingAdmin = optAdmin;
        if (insert) {
            titles.forEach((title) => {
                if (!existingAdmin.questionnaires?.includes(title)) {
                    if (existingAdmin.questionnaires == null) {
                        existingAdmin.questionnaires = [title];
                    }
                    else {
                        //don't add duplicates
                        existingAdmin.questionnaires.push(title);
                    }
                }
            });
        } else {
            existingAdmin.questionnaires = existingAdmin.questionnaires?.filter(
                (title) => !titles.includes(title)
            );
        }
        try {

            const admin = await existingAdmin.save();
            console.log(
                'Success updating admin and questionnaires links - ',
                admin.email
            );
        }
        catch (err) {
            console.log(
                'Error updating admin and questionnaires links',
                err
            );
        }
    }
    catch (err) {
        console.log(err);
        return;
    }




}

const Schema1 = z.object({
    links: z.array(z.object({
        admin: z.string(),
        questionnaires: z.array(z.string()),
        insert: z.boolean(),
    })),
})
function updateQuestionnairesLinks(req: express.Request, res: express.Response, insert = true) {
    if (!req.body || !req.body.links) {
        return res
            .status(400)
            .json('Admins and questionnaires links not found in the request');
    }
    const reqBody = Schema1.parse(req.body);
    const linkPromises = reqBody.links.map((link, idx) => {
        return updateLinks(link.admin, link.questionnaires, insert);
    });
    Promise.all(linkPromises).then((links) => {
        return res
            .status(200)
            .json('Admin and questionnaires links are updated');
    });
}

//link admin(s) with corresponding questionnaires (by 'title' since it's the unique id)
//request body looks like the following:
//  {"links": [{"admin":"abc@gmail.com", "questionnaires":["CIIT_Workshop_Spring_2021"]}]}"
router.route('/questionnaires/link').post((req, res) => {
    updateQuestionnairesLinks(req, res, true);
});

//unlink admin(s) with corresponding questionnaires
router.route('/questionnaires/unlink').post((req, res) => {
    updateQuestionnairesLinks(req, res, false);
});

router.route('');

