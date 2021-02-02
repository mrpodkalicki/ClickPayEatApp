const { validationResult } = require('express-validator/check');

const Admin = require('../models/admin');
const User = require('../models/user');

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

exports.getUserRole = (req, res, next) => {
    const email = req.params.email;
    Promise.any([
        Admin.find({ email: email })
            .then((admin) => {
                if (!isEmptyObject(admin)) return new Promise((resolve) => resolve(admin));
                return new Promise((resolve, reject) => reject());
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            }),
        User.find({ email: email })
            .then((user) => {
                if (!isEmptyObject(user)) return new Promise((resolve) => resolve(user));
                return new Promise((resolve, reject) => reject());
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            })
    ])
    .then(obj => {
        const re = /@(\w+)/;
        const role = obj[0].email.match(re)[1];
        res.status(200).json({ role: role === 'gmail' ? 'user': role })
    })
    .catch(err => next(err))
    
}

exports.getAllAdmins = (req, res, next) => {
    Admin.find()
        .then((admins) => {
            if (isEmptyObject(admins)) {
                const error = new Error('No orders found');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ admins: admins });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.signUp = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validatin failed');
        error.statusCode = 422;
        error.data = errrors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const admin = new Admin({
        email: email,
        password: password,
    });
    admin.save().then((admin) => {
        res.status(201)
            .json({
                message: 'Admin created',
                userId: admin._id,
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
    Admin.findOne({ email: email })
        .then((admin) => {
            if (!admin) {
                const error = new Error('Not found');
                error.statusCode = 401;
                throw error;
            }
            if (admin.password !== password) {
                const error = new Error('Incorrect');
                error.statusCode = 401;
                throw error;
            }
            res.status(200).json({ admin: admin });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
