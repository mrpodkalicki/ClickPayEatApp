import { combineReducers } from '@reduxjs/toolkit';
import signInReducer from './sigIn';
import restaurantsReducer from './restaurant';
import mealsReducer from './meals';
import orderReducer from './order';
export const rootReducer = combineReducers({
    signInResponse: signInReducer,
    getRestaurantsResponse: restaurantsReducer,
    getMealsResponse: mealsReducer,
    postOrderRequest: orderReducer
});