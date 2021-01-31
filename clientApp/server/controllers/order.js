const Order = require('../models/order');

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

exports.getOrders = (req, res, next) => {
    Order.find()
        .then((orders) => {
            if (isEmptyObject(orders)) {
                const error = new Error('No orders found');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ orders: orders });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
        .then((order) => {
            if (!order) {
                const error = new Error('Order not found');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ order: order });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getOrderByEmail = (req, res, next) => {
    const email = req.params.email;
    Order.find({ clientEmail: email })
        .then((order) => {
            if (!order) {
                const error = new Error('Order not found');
                error.statusCode = 404;
                throw error;
            }
            const result = { meals: []};
            let totalPrice = 0;
            for (const singleOrder of order) {
                result.restaurantName = singleOrder.restaurantName;
                totalPrice += singleOrder.totalPrice;
                for (const meal of singleOrder.meals) {
                    result.meals.push(meal);
                }
            }
            result.totalPrice = totalPrice;
            result.savedMoney = Math.floor(totalPrice * 0.12);
            res.status(200).json({ order: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getOrderByRestaurantName = (req, res, next) => {
    const restaurant = req.params.restaurantName;
    Order.find({ restaurantName: restaurant })
        .then((order) => {
            if (!order) {
                const error = new Error('Order not found');
                error.statusCode = 404;
                throw error;
            }
            const result = [];
            for (const singleOrder of order) {
                result.push({
                    clientName: singleOrder.clientName,
                    clientSurname: singleOrder.clientSurname,
                    clientEmail: singleOrder.clientEmail,
                    deliveryAddress: singleOrder.deliveryAddress,
                    deliveryTime: singleOrder.deliveryTime,
                    phoneNumber: singleOrder.phoneNumber,
                    totalPrice: singleOrder.totalPrice,
                    meals: singleOrder.meals
                })
            }
            res.status(200).json({ orders: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.postOrder = (req, res, next) => {
    const meals = req.body.meals;
    const restaurant = req.body.restaurantName;
    const price = req.body.totalPrice;
    const address = req.body.deliveryAddress;
    const time = req.body.deliveryTime;
    const phone = req.body.phoneNumber;
    const email = req.body.clientEmail;
    const name = req.body.clientName;
    const surname = req.body.clientSurname;
    const order = new Order({
        meals: meals,
        restaurantName: restaurant,
        totalPrice: price,
        deliveryAddress: address,
        deliveryTime: time,
        phoneNumber: phone,
        clientEmail: email,
        clientName: name,
        clientSurname: surname,
    });
    order
        .save()
        .then(() => {
            res.status(201).json({ order: order });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
        .then((order) => {
            if (!order) {
                const error = new Error('Order not found');
                error.statusCode = 404;
                throw error;
            }
            return Order.findByIdAndRemove(orderId);
        })
        .then(() => {
            res.status(200).json({ message: 'Order deleted' });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
