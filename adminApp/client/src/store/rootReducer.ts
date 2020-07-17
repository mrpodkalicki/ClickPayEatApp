import { combineReducers } from '@reduxjs/toolkit';
import signInReducer from './sigIn';
import restaurantsReducer from './restaurant';
import mealsReducer from './meals';
import ordersReducer from './orders';

export const rootReducer = combineReducers({
    signInResponse: signInReducer,
    getRestaurantsResponse: restaurantsReducer,
    getMealsResponse: mealsReducer,
    getOrdersResponse: ordersReducer
});