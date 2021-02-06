import {API, API_SECOND} from "../utilities/API";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {put, takeEvery} from "redux-saga/effects";
import {useDispatch} from "../hooks/useDispatch";
import {useSelector} from "../hooks/useSelector";
const axios = require('axios');

const api = {
    postOrderRequest: (order: any) => {
        try {
            return axios.post(API_SECOND + '/order/new',{
                "meals": order.meals,
                "totalPrice": order.totalPrice,
                "restaurantName": order.restaurantName,
                "deliveryAddress": order.deliveryAddress,
                "deliveryTime": order.deliveryTime,
                "phoneNumber": order.phoneNumber,
                "clientName": order.clientName,
                "clientSurname": order.clientSurname,
                "clientEmail": order.clientEmail
            });
        } catch (err) {
            return err
        }
    }
}

const order = createSlice({
    name: 'order',
    initialState: {
        status: '',
        data: '',
        error: '',
    },
    reducers: {
        postOrderRequest: (state,_action:PayloadAction<any>) => {
            state.status = 'loading';
            state.error = '';
        },
        postOrderSuccess: (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.data = action.payload;
            state.error = '';
        },
        postOrderFailure: (state, action:PayloadAction<string>) => {
            state.status = 'failure';
            state.error = action.payload;
        }
    }
});
const { actions } = order;

function* postOrderRequestSagaWorker({ payload }: any) {
    try {
        const response: any = yield api.postOrderRequest(payload);
        yield put(actions.postOrderSuccess(response));
    } catch (ex) {
        yield put(actions.postOrderFailure(ex.message));
    }
}
export function*postOrderSagaWatcher() {
    yield takeEvery(actions.postOrderRequest.type, postOrderRequestSagaWorker);
}

export const usePostOrder = () => {
    const dispatch =  useDispatch();
    return {
        postOrderRequest: (payload: any) => dispatch(actions.postOrderRequest(payload)),

    };
};

export const useOrderState = () => useSelector((state) =>  state.postOrderRequest);


export default order.reducer;