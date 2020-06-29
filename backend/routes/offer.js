const express = require('express');

const offerController = require('../controllers/offer');

const router = express.Router();

router.get('/offer', offerController.getOffers);
router.get('/offer/:restaurantId', offerController.getOffer);

router.post('/offer', offerController.postOffer);

router.put('/offer/:restaurantId', offerController.updateOffer)

router.delete('/offer/:restaurantId', offerController.deleteOffer)

module.exports = router;