const { validationResult } = require('express-validator/check');

const User = require('../models/user');

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

exports.signUp = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validatin failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const user = new User({
        email: email,
        password: password,
    });
    user.save().then((user) => {
        res.status(201)
            .json({
                message: 'User created',
                userId: user._id,
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    });
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                const error = new Error('Not found');
                error.statusCode = 401;
                throw error;
            }
            if (user.password !== password) {
                const error = new Error('Incorrect');
                error.statusCode = 401;
                throw error;
            }
            res.status(200).json({ user: user });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getAllUsers = (req, res, next) => {
    User.find()
        .then((users) => {
            if (isEmptyObject(users)) {
                const error = new Error('No orders found');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ users: users });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}
