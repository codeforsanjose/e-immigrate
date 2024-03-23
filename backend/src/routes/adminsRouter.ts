import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { z } from 'zod';

import { Admin } from '../models/admin.js';
import { Questionnaires } from '../models/questionnaires.js';

import { loadQuestionnaireXlsxIntoDB, loadTranslationXlsxIntoDB } from '../features/excelToDb.js';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { getRequiredJwtKey } from '../features/jwtKey/access.js';
import { verifyJwtAsync } from '../features/jwtVerify/index.js';
import { routeLogger, scopedLogger } from '../features/logging/logger.js';

const router = express.Router();
export { router as adminsRouter };
const SALT_ROUNDS = 10;
const ERRMSG = { error: { message: '[admins] Not logged in or auth failed' } };
const EMAIL_REGEX =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
;

router.route('/').get(async (req, res) => {
    const admins = await Admin.find();
    
    const allAdmins: Array<{ password?: unknown, }> = JSON.parse(JSON.stringify(admins));
    allAdmins.forEach((admin) => {
        delete admin.password;
    });
    return res.json(allAdmins);
});

const RegisterSchema = z.object({
    email: z.string(),
    name: z.string(),
    password: z.string(),
});
// route to sign up
router.route('/').post(async (req, res) => {
    const logger = routeLogger('registerApi');
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
        const admins = await Admin.find({ email }).exec();
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
            email,
            name,
            password: hash,
        });

        try {
            const result = await admin.save();
            logger.debug(result, 'created admin user');
            const jwToken = jwt.sign(
                { email },
                getRequiredJwtKey()
            );
            return res.status(201).json({
                name,
                email,
                jwt: jwToken,
            });
        }
        catch (err) {
            logger.error(err, 'register failed');
            return res.status(500).json({
                error: {
                    message: 'Sign up failed',
                },
            });
        }
    }
    catch (err) {
        logger.error(err, 'error!');
        return res.json(err);
    }
});
const SessionSchema = z.object({
    email: z.string(),
    password: z.string(),
});
// route for logging in with email and password
router.route('/sessions').post(async (req, res) => {
    const logger = routeLogger('loginApi');
    const reqBody = SessionSchema.parse(req.body);
    const {
        email,
        password,
    } = reqBody;
    if (password == null || password === '' || email == null || email === '') {
        return res.status(404).json(ERRMSG);
    }
    const admin = await Admin.findOne({ email }).exec();
    if (admin == null) {
        logger.error(`Failed to find admin`);
        return;
    };

    const hashPw = admin.password;
    bcrypt.compare(password, hashPw, (err, result) => {
        // if passwords matches, result will be truthy
        if (err != null) {
            logger.error(err, 'bcrypt error');
            return res.status(500).json(ERRMSG);
        }

        if (result) {
            const jwToken = jwt.sign(
                { email },
                getRequiredJwtKey()
            );
            return res.status(200).json({
                name: admin.name,
                email,
                jwt: jwToken,
            });
        }
        else {
            return res.status(500).json(ERRMSG);
        }
    });
});

router.route('/:id').delete(async (req, res) => {
    const logger = routeLogger('deleteApi');
    try {
        const result = await Admin.deleteOne({ _id: req.params.id }).exec();
        if (result == null) {
            logger.error({
                id: req.params.id,
            }, `Failed to find the admin`);
            return;
        }
        logger.info({
            id: req.params.id,
        }, 'Removed admin');
        return res.status(200).json({
            message: 'admin deleted',
        });
    }
    catch (err) {
        logger.error(err);
        return res.status(500).json({
            error: err,
        });
    }
});

const JwtBodySchema = z.object({
    jwToken: z.string(),
});

type IsAdminCallBack<T> =
    | (() => Promise<T>)
    | (() => T);
/**
 * verify that the http request comes from a admin user
 * detect the user from the body containing the JWT token
 * respond the request with an error if the token is missing or the user identified
 * in token is not an admin user
 * call the isAdminCallBack function if the user is an admin
 **/
async function enforceAdminOnly<TResult>(req: express.Request, res: express.Response, isAdminCallBack: IsAdminCallBack<TResult>) {
    const reqBody = JwtBodySchema.parse(req.body);
    const {
        jwToken,
    } = reqBody;
    // verify the request has a jwtToken beloning to an Admin User
    if (jwToken == null || jwToken === '') {
        return res
            .status(401)
            .json({ error: { message: 'Missing JWT Token' } });
    }
    try {
        const token = await verifyJwtAsync(jwToken);
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
const QuestionnaireFileSchema = z.object({
    title: z.string(),
});
// route for uploading the questionnaires spreadsheet in the database
router.route('/questionnairefile').post(async (req, res) => {
    const logger = routeLogger('uploadQuestinnaires');
    const reqBody = QuestionnaireFileSchema.parse(req.body);
    await enforceAdminOnly(req, res, processQuestionnaireAsAdmin);
    async function processQuestionnaireAsAdmin() {
        logger.info({
            files: req.files, 
            body: req.body,
        }, 'processQuestionnaireAsAdmin');
        const {
            title,
        } = reqBody;
        if (req.files == null) {
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
        try {
            await loadQuestionnaireXlsxIntoDB(excelFileContent, title);
            res.status(200).json({
                message: 'Questionnaire Documenent Recieved',
            });
        }
        catch (err) {
            logger.error(err);
            res.status(500).json({
                message: 'Error, Storing Questionnaire in database',
            });
        }
    }
});
// route for deleteing a questionnaire by title
router.route('/deletequestionnaire/:title').delete(async (req, res) => {
    const logger = routeLogger('deleteQuestionnaireByTitle');
    await enforceAdminOnly(req, res, deleteQuestionnaireByTitle);
    async function deleteQuestionnaireByTitle() {
        try {
            const results = await Questionnaires.deleteMany({
                title: decodeURIComponent(req.params.title),
            });

            if (!results.acknowledged) {
                logger.warn('Delete Failed');
                res.status(500).json({ message: 'Delete Failed' });
                return;
            }
            if (results.deletedCount === 0) {
                res.status(404).json({ message: 'Title not found' });
                return;
            }

            res.status(200).json({ message: 'Questionnaire Removed' });
        }
        catch (err) {
            logger.error(err, 'Error, Deleting Questionnaires from database');
            res.status(500).json({
                message: 'Error, Deleting Questionnaires from database',
            });
            return;
        }
    }
});
// route for uploading the translation spreadsheet in the database
router.route('/translateContent').post(async (req, res) => {
    await enforceAdminOnly(req, res, processTranslatedContentAsAdmin);
    async function processTranslatedContentAsAdmin() {
        if (req.files == null) {
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
        try {
            await loadTranslationXlsxIntoDB(excelFileContent);
            res.status(200).send('Translation Document Recieved');
        }
        catch (err) {
            res.status(500).send('Error, Storing Translation in database');
            return;
        }
    }
});

router.use(authMiddleware); // all apis AFTER this line will require authentication as implemented in auth.js
const SuperSchema = z.object({
    admins: z.array(z.string()),
});
// set one or more admins to be super admins:
// request body looks like the following:
//  {"admins":["abcde@gmail.com", "xyz@123.org"]}
router.route('/super').post(async (req, res) => {
    const logger = routeLogger('makeAdmin');
    const reqBody = SuperSchema.parse(req.body);
    const {
        admins,
    } = reqBody;
    if (reqBody == null) {
        return res.status(400).json('Admin identifiers not found');
    }
    try {
        const result = await Admin.updateMany({ email: { $in: admins } }, { issuper: true }).exec();
        return res
            .status(200)
            .json(`Admins to super status - ${result.matchedCount} selected, ${result.modifiedCount} updated`);
    }
    catch (err) {
        logger.error({
            body: req.body, 
            err, 
        });
        return res.status(500).json('Error updating super admin status');
    }
});

/**
 *  link questionnaires to admin identified by email
 *
 * @param {string} email
 * @param {Array<string>} titles
 * @param {boolean} [insert=true]
 */
async function updateLinks(email: string, titles: Array<string>, insert: boolean = true) {
    const logger = scopedLogger('updateLinks');
    try {
        const optAdmin = await Admin.findOne({ email }).exec();
        if (optAdmin == null) return;
        const existingAdmin = optAdmin;
        if (insert) {
            titles.forEach((title) => {
                if (!(existingAdmin.questionnaires?.includes(title) ?? false)) {
                    if (existingAdmin.questionnaires == null) {
                        existingAdmin.questionnaires = [title];
                    }
                    else {
                        // don't add duplicates
                        existingAdmin.questionnaires.push(title);
                    }
                }
            });
        }
        else {
            existingAdmin.questionnaires = existingAdmin.questionnaires?.filter(
                (title) => !titles.includes(title)
            );
        }
        try {
            const admin = await existingAdmin.save();
            logger.info({
                email: admin.email,
            }, 'Success updating admin and questionnaires links');
        }
        catch (err) {
            logger.error(err, 'Error updating admin and questionnaires links');
        }
    }
    catch (err) {
        logger.error(err);
        return;
    }
}

const QuestionnaireLinksSchema = z.object({
    links: z.array(z.object({
        admin: z.string(),
        questionnaires: z.array(z.string()),
        insert: z.boolean(),
    })),
});

async function updateQuestionnairesLinks(req: express.Request, res: express.Response, insert = true) {
    const reqBody = QuestionnaireLinksSchema.parse(req.body);
    const { links: reqLinks } = reqBody;
    if (reqLinks == null) {
        return res
            .status(400)
            .json('Admins and questionnaires links not found in the request');
    }
    const linkPromises = reqLinks.map(async (link, idx) => {
        await updateLinks(link.admin, link.questionnaires, insert);
    });
    await Promise.all(linkPromises);
    return res
        .status(200)
        .json('Admin and questionnaires links are updated');
}

/**
 *   link admin(s) with corresponding questionnaires (by 'title' since it's the unique id)
 * request body looks like the following:
 * {"links": [{"admin":"abc@gmail.com", "questionnaires":["CIIT_Workshop_Spring_2021"]}]}"
 */
router.route('/questionnaires/link').post(async (req, res) => {
    await updateQuestionnairesLinks(req, res, true);
});

/**
 * unlink admin(s) with corresponding questionnaires
 */
router.route('/questionnaires/unlink').post(async (req, res) => {
    await updateQuestionnairesLinks(req, res, false);
});

router.route('');
