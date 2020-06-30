const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const offerRoutes = require('./routes/offer');
const menuRoutes = require('./routes/menu');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    next();
});

app.use(offerRoutes);
app.use('/menu', menuRoutes);
app.use('/admin', adminRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(
        'mongodb+srv://mateusz:DFOUAsF9AJvp0lYB@cluster0-vbkgm.mongodb.net/glodny?retryWrites=true&w=majority'
    )
    .then(() => {
        console.log('Connected');
        app.listen(8080);
    })
    .catch((err) => {
        console.log(err);
    });
