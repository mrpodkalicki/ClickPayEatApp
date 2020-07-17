import { all } from 'redux-saga/effects';
import {signInSagaWatcher} from "./sigIn";
import {restaurantsSagaWatcher} from "./restaurant";
import {mealsSagaWatcher} from "./meals";
import {ordersSagaWatcher} from "./orders";

export function* rootSaga() {
    yield all([signInSagaWatcher(), restaurantsSagaWatcher(), mealsSagaWatcher(), ordersSagaWatcher()]);
}