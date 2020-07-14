import { all } from 'redux-saga/effects';
import {signInSagaWatcher} from "./sigIn";
import {getRestaurantsSagaWatcher} from "./restaurant";

export function* rootSaga() {
    yield all([signInSagaWatcher(), getRestaurantsSagaWatcher()]);
}