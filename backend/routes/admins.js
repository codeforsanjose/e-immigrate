const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');
const mongoose = require('mongoose');

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

router.route('');

module.exports = router;
