import { all } from 'redux-saga/effects';
import {signAdminSagaWatcher} from "./signAdmin";
import {restaurantsSagaWatcher} from "./restaurant";
import {mealsSagaWatcher} from "./meals";
import {ordersSagaWatcher} from "./orders";

export function* rootSaga() {
    yield all([signAdminSagaWatcher(), restaurantsSagaWatcher(), mealsSagaWatcher(), ordersSagaWatcher()]);
}