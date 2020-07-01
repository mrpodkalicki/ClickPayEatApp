const Order = require('../models/order');

function isEmptyObject(object) {
    return !Object.keys(object).length;
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

exports.postOrder = (req, res, next) => {
    const meals = req.body.meals;
    const price = req.body.price;
    const address = req.body.deliveryAddress;
    const time = req.body.deliveryTime;
    const phone = req.body.phoneNumber;
    const name = req.body.clientName;
    const surname = req.body.clientSurname;
    const order = new Order({
        meals: meals,
        price: price,
        deliveryAddress: address,
        deliveryTime: time,
        phoneNumber: phone,
        clientName: name,
        clientSurname: surname,
    });
    order
        .save()
        .then(res.status(201).json({ order: order }))
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
