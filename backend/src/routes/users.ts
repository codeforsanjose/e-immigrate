import express from 'express';
import {User} from '../models/user.js';
import { authMiddleware } from '../middleware/auth.js';
import { userRequestAccessor } from '../features/userAccess/index.js';
const router = express.Router();
export { router as usersRouter };

router.use(authMiddleware);

router.route('/').get((req, res) => {
    const admin = userRequestAccessor.get(res);

    User.find()
        .then((allUsers) => {
            const usersInfo = { users: allUsers, admin: admin };
            res.json(usersInfo);
        })
        .catch((err) => console.log(err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then((users) => res.json(users))
        .catch((err) => console.log(err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const document = req.body.document;

    const newUser = new User({
        name,
        phoneNumber,
        document,
    });

    newUser
        .save()
        .then(() => res.json('user added'))
        .catch((err) => console.log(err));
});

router.route('/update/:id').post(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            console.error(`Failed to find user with id ${req.params.id}`);
            return;
        }

        user.phoneNumber = req.body.phoneNumber;
        user.document = req.body.document;
        await user.save();
        res.json('User Updated');
    }
    catch (err) {
        console.log(err);
        return;
    }
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((users) => res.json('User Deleted'))
        .catch((err) => console.log(err));
});

router.route('');

