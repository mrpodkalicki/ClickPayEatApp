import { combineReducers } from '@reduxjs/toolkit';
import signInReducer from './sigIn';
import getRestaurants from './restaurant';

export const rootReducer = combineReducers({
    signInResponse: signInReducer,
    getRestaurants: getRestaurants
});