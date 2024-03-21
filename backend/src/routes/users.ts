import express from 'express';
import { z } from 'zod';

import { User } from '../models/user.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { userRequestAccessor } from '../features/userAccess/index.js';
import { routeLogger } from '../features/logging/logger.js';
const router = express.Router();
export { router as usersRouter };

router.use(authMiddleware);

router.route('/').get(async (req, res) => {
    const admin = userRequestAccessor.get(res);

    const allUsers = await User.find();
    const usersInfo = { users: allUsers, admin };
    res.json(usersInfo);
});

router.route('/:id').get(async (req, res) => {
    const users = await User.findById(req.params.id);
    res.json(users);
});

const AddSchema = z.object({
    name: z.string(),
    phoneNumber: z.string(),
    document: z.string(),
});
router.route('/add').post(async (req, res) => {
    const reqBody = AddSchema.parse(req.body);
    const {
        name,
        phoneNumber,
        document,
    } = reqBody;
    const newUser = new User({
        name,
        phoneNumber,
        document,
    });

    await newUser.save();
    res.json('user added');
});
const UpdateUserSchema = z.object({
    phoneNumber: z.string(),
    document: z.string(),
});
router.route('/update/:id').post(async (req, res) => {
    const logger = routeLogger('updateUser');
    const user = await User.findById(req.params.id);
    if (user == null) {
        logger.error({
            paramId: req.params.id,
        }, `Failed to find user`);
        return;
    }
    const reqBody = UpdateUserSchema.parse(req.body);
    user.phoneNumber = reqBody.phoneNumber;
    user.document = reqBody.document;
    await user.save();
    res.json('User Updated');
});

router.route('/:id').delete(async (req, res) => {
    const users = await User.findByIdAndDelete(req.params.id);
    res.json('User Deleted');
});

router.route('');
