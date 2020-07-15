import { combineReducers } from '@reduxjs/toolkit';
import signInReducer from './sigIn';
import restaurantsReducer from './restaurant';
import mealsReducer from './meals';

export const rootReducer = combineReducers({
    signInResponse: signInReducer,
    getRestaurantsResponse: restaurantsReducer,
    getMealsResponse: mealsReducer
});