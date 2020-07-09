import { all } from 'redux-saga/effects';
import {signInSagaWatcher} from "./sigIn";

export function* rootSaga() {
    yield all([signInSagaWatcher()]);
}