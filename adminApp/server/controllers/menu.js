const Restaurant = require('../models/restaurant');
const Meal = require('../models/meal');

exports.getMeals = (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    Restaurant.findOne({ _id: restaurantId })
        .populate('menu.meals.mealId')
        .then((restaurant) => {
            res.status(200).json({
                message: 'Meals fetched',
                meals: restaurant.menu,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getMeal = (req, res, next) => {
    const mealId = req.params.mealId;
    Meal.findById(mealId)
        .then((meal) => {
            if (!meal) {
                const error = new Error('Could not find meal');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Meal fetched', meal: meal });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.postMeal = (req, res, next) => {
    const restaurantId = req.body.restaurantId;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;

    const meal = new Meal({
        name: name,
        description: description,
        price: price,
        restaurantId: restaurantId,
    });
    meal.save()
        .then(() => {
            return Restaurant.findById(restaurantId);
        })
        .then((restaurant) => {
            return restaurant.addToMenu(meal);
        })
        .then((restaurant) => {
            res.status(201).json({
                message: 'Meal created',
                meal: meal,
                restaurant: { _id: restaurant._id, name: restaurant.name },
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateMeal = (req, res, next) => {
    const mealId = req.params.mealId;
    let description = req.body.description;
    let name = req.body.name;
    let price = req.body.price;

    Meal.findById(mealId)
        .then((meal) => {
            if (!meal) {
                const error = new Error('Could not find restaurant');
                error.statusCode = 404;
                throw error;
            }
            if (!description) {
                description = meal.description;
            }
            if (!name) {
                name = meal.name;
            }
            if (!price) {
                price = meal.price;
            }
            meal.description = description;
            meal.name = name;
            meal.price = price;
            return meal.save();
        })
        .then((meal) => {
            res.status(200).json({
                message: 'Meal updated',
                meal: meal,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteMeal = (req, res, next) => {
    const mealId = req.params.mealId;
    let restaurantId;
    Meal.findById(mealId)
        .then((meal) => {
            if (!meal) {
                const error = new Error('Could not find a meal');
                error.statusCode = 404;
                throw error;
            }
            restaurantId = meal.restaurant;
            return Meal.findByIdAndRemove(mealId);
        })
        .then(() => {
            return Restaurant.findById(restaurantId);
        })
        .then((restaurant) => {
            restaurant.menu.pull(mealId);
            return restaurant.save();
        })
        .then(() => {
            res.status(200).json({ message: 'Meal deleted' });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
