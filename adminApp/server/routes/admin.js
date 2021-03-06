const express = require('express');
const { body } = require('express-validator/check');

const Admin = require('../models/admin');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/all', adminController.getAllAdmins);
router.get('/role/:email', adminController.getUserRole);

router.post(
    '/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .custom((value, { req }) => {
                return Admin.findOne({ email: value }).then((adminDoc) => {
                    if (adminDoc) {
                        return Promise.reject('Email address already exists!');
                    }
                });
            })
            .normalizeEmail(),
        body('password').trim().isLength({ min: 5 }),
    ],
    adminController.signUp
);

router.post('/login', adminController.login);

module.exports = router;