import { all } from 'redux-saga/effects';
import {signInSagaWatcher} from "./sigIn";
import {restaurantsSagaWatcher} from "./restaurant";

export function* rootSaga() {
    yield all([signInSagaWatcher(), restaurantsSagaWatcher()]);
}