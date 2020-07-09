import { combineReducers } from '@reduxjs/toolkit';
import signInReducer from './sigIn';

export const rootReducer = combineReducers({
    signInResponse: signInReducer
});