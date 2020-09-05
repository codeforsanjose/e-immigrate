const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

router.use(auth);

router.route('/').get((req, res) => {
    const admin = req.user;

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

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            user.phoneNumber = req.body.phoneNumber;
            user.document = req.body.document;

            user.save()
                .then(() => res.json('User Updated'))
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((users) => res.json('User Deleted'))
        .catch((err) => console.log(err));
});

router.route('');

module.exports = router;
