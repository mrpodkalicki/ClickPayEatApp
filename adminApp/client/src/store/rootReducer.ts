import { combineReducers } from '@reduxjs/toolkit';
import signAdminReducer from './signAdmin';
import restaurantsReducer from './restaurant';
import mealsReducer from './meals';
import ordersReducer from './orders';
import userRoleReducer from "./userRole";

export const rootReducer = combineReducers({
    signAdminResponse: signAdminReducer,
    getRestaurantsResponse: restaurantsReducer,
    getMealsResponse: mealsReducer,
    getOrdersResponse: ordersReducer,
    getUserRoleResponse: userRoleReducer

});