const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/all', userController.getAllUsers);

router.post('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then((user) => {
                if (user) {
                    return Promise.reject('Email address already exists!');
                }
            });
        })
        .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
], userController.signUp);

router.post('/login', userController.login);

module.exports = router;
