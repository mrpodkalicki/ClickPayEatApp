const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        'ref': 'Restaurant',
        required: true,
    },
});

module.exports = mongoose.model('Meal', mealSchema);
