const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = Schema({
    meals: [
        {
            mealId: {
                type: Schema.Types.ObjectId,
                ref: 'Meal',
            },
            quantity: {
                type: Number,
            },
        },
    ],
    price: {
        type: Number,
        required: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    deliveryTime: {
        type: Date,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    clientName: {
        type: String,
        required: true,
    },
    clientSurname: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Order', orderSchema);
