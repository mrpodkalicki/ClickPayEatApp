import { combineReducers } from '@reduxjs/toolkit';
import signInReducer from './sigIn';
import restaurantsReducer from './restaurant';

export const rootReducer = combineReducers({
    signInResponse: signInReducer,
    getRestaurantsResponse: restaurantsReducer,
});