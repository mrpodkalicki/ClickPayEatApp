const express = require('express');

const orderController = require('../controllers/order');

const router = express.Router();

router.get('/all', orderController.getOrders);
router.get('/:orderId', orderController.getOrder);
router.get('/email/:email', orderController.getOrderByEmail);
router.get('/restaurant/:restaurantName', orderController.getOrderByRestaurantName);

router.post('/new', orderController.postOrder);

router.delete('/delete/:orderId', orderController.deleteOrder);

module.exports = router;
