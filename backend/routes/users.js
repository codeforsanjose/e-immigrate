const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => console.log(err));
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => console.log(err));
});

router.route('/add').post((req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const document = req.body.document;

  const newUser = new User({
    phoneNumber,
    document,
  });

  newUser.save()
    .then(() => res.json('user added'))
    .catch(err => console.log(err))
});

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.phoneNumber = req.body.phoneNumber;
      user.document = req.body.document;

      user.save()
        .then(() => res.json('User Updated'))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(users => res.json('User Deleted'))
    .catch(err => console.log(err));
});

router.route('')

module.exports = router;