const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = Schema({
    cuisine: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    deliveryTime: {
        type: Number,
        default: 35,
    },
    menu: {
        meals: [
            {
                mealId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Meal',
                },
            },
        ],
    },
});

restaurantSchema.methods.addToMenu = function (meal) {
    const updatedMenu = [...this.menu.meals];
    updatedMenu.push({
        mealId: meal._id,
    });
    this.menu = { meals: updatedMenu };
    return this.save();
};

module.exports = mongoose.model('Restaurant', restaurantSchema);