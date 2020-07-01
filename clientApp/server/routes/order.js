const express = require('express');

const orderController = require('../controllers/order');

const router = express.Router();

router.get('/all', orderController.getOrders);
router.get('/:orderId', orderController.getOrder);

router.post('/new', orderController.postOrder);

router.delete('/delete/:orderId', orderController.deleteOrder);

module.exports = router;
