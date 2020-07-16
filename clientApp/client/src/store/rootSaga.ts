import { all } from 'redux-saga/effects';
import {signInSagaWatcher} from "./sigIn";
import {restaurantsSagaWatcher} from "./restaurant";
import {mealsSagaWatcher} from "./meals";
import {postOrderSagaWatcher} from "./order";

export function* rootSaga() {
    yield all([signInSagaWatcher(), restaurantsSagaWatcher(), mealsSagaWatcher(), postOrderSagaWatcher()]);
}