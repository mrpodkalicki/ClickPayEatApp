const express = require('express');

const menuController = require('../controllers/menu');

const router = express.Router();

router.get('/:restaurantId', menuController.getMeals);
router.get('/meal/:mealId', menuController.getMeal);

router.post('/add-meal', menuController.postMeal);

router.put('/meal/:mealId', menuController.updateMeal);

router.delete('/meal/:mealId', menuController.deleteMeal);

module.exports = router;
