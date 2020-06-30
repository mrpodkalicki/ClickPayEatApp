const Restaurant = require('../models/restaurant');

exports.getOffers = (req, res, next) => {
    Restaurant.find()
        .then((restaurants) => {
            res.status(200).json({
                message: 'Restaurants offers fetched',
                restaurants: restaurants,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getOffer = (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            res.status(200).json({
                message: 'Restaurant offer fetched',
                restaurant: restaurant,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.postOffer = (req, res, next) => {
    const cuisine = req.body.cuisine;
    const name = req.body.name;
    const address = req.body.address;
    const category = req.body.category;

    const restaurant = new Restaurant({
        cuisine: cuisine,
        name: name,
        address: address,
        category: category,
    });
    restaurant
        .save()
        .then(() => {
            res.status(201).json({
                message: 'Restaurant offer created',
                restaurant: restaurant,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateOffer = (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    let cuisine = req.body.cuisine;
    let name = req.body.name;
    let address = req.body.address;
    let category = req.body.category;
    
    Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (!restaurant) {
                const error = new Error('Could not find restaurant');
                error.statusCode = 404;
                throw error;
            }
            if (!cuisine) {
                cuisine = restaurant.cuisine;
            }
            if (!name) {
                name = restaurant.name;
            }
            if (!address) {
                address = restaurant.address;
            }
            if (!category) {
                category = restaurant.category;
            }
            restaurant.cuisine = cuisine;
            restaurant.name = name;
            restaurant.address = address;
            restaurant.category = category;
            return restaurant.save();
        })
        .then((restaurant) => {
            res.status(200).json({
                message: 'restaurant offer updated',
                restaurant: restaurant,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteOffer = (req, res, next) => {
    restaurantId = req.params.restaurantId;
    Restaurant.findByIdAndRemove(restaurantId)
        .then(res.status(200).json({ message: 'Restaurant offer deleted' }))
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
