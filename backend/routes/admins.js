const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Admin = require('../models/admin');
const mongoose = require('mongoose');

const SALT_ROUNDS = 10;

router.route('/').get((req, res) => {
    Admin.find()
      .then(admins => res.json(admins))
      .catch(err => console.log(err));
});

router.route('/').post((req, res) => {
    Admin.find({ email: req.body.email})
    .exec()
    .then(admins => {
        if(admins.length >= 1){
            return res.status(409).json({
                message: "admin email exists"
            })
        }
        bcrypt.hash(req.body.password, SALT_ROUNDS, (err, hash) => {
            if(err){
                return res.status(500).json({
                    error: err
                })
            }
            const admin = new Admin({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });

            admin.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: "admin created"
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
        })
    })
})

router.route("/:id").delete((req, res) => {
    Admin.remove({ _id: req.params.id })
    .exec()
    .then(result => {
        return res.status(200).json({
            message: "admin deleted"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


router.route('')

module.exports = router;