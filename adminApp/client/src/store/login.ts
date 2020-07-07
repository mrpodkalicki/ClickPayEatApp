import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

// // const Api = 'localhost:8080'
//
// function* fetchUser(action: any) {
//     try {
//         const user = yield call(Api.fetchUser, action.payload.userId);
//         yield put({type: "USER_FETCH_SUCCEEDED", user: user});
//     } catch (e) {
//         yield put({type: "USER_FETCH_FAILED", message: e.message});
//     }
// }
//
//
// function* mySaga() {
//     yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
// }
//
//
// function* mySaga() {
//     yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }
//
// export default mySaga;