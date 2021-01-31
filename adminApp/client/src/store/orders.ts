import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import { useDispatch } from '../hooks/useDispatch';
import { useSelector } from '../hooks/useSelector';
import {API_TWO} from "../utilities/API";
const axios = require('axios');


const api = {
    getOrdersRequest: () => {
        try{
            return axios.get( API_TWO + '/order/all');
        } catch (err) {
            return err
        }
    },
    deleteOrderRequest: (id: string) => {
        try {
            return axios.delete(API_TWO + `/order/delete/${id}`);
        } catch (err) {
            return err
        }
    }
}

const orders = createSlice({
    name: 'orders',
    initialState: {
        status: '',
        data: '',
        error: '',
    },
    reducers: {
        getOrdersRequest: (state) => {
            state.status = 'loading';
            state.error = '';
        },
        getOrdersSuccess: (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.data = action.payload;
            state.error = '';
        },
        getOrdersFailure: (state, action: PayloadAction<string>) => {
            state.status = 'failure';
            state.error = action.payload;
        },
        deleteOrderRequest: (state, _action:PayloadAction<any>) => {
            state.status = 'loading';
            state.error = '';
        },
        deleteOrderSuccess: (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.data = action.payload;
            state.error = '';
        },
        deleteOrderFailure: (state, action:PayloadAction<string>) => {
            state.status = 'failure';
            state.error = action.payload;
        },
    }
});

const { actions } = orders;

function* getOrdersRequestSagaWorker() {
    try {
        const response: any = yield api.getOrdersRequest();
        yield put(actions.getOrdersSuccess(response));
    } catch (ex) {
        yield put(actions.getOrdersFailure(ex.message));
    }
}

function* deleteOrdersRequestSagaWorker({ payload }: any) {
    try {
        const response: any = yield api.deleteOrderRequest(payload);
        yield put(actions.deleteOrderSuccess(response));
    } catch (ex) {
        yield put(actions.deleteOrderFailure(ex.message));
    }
}

export function*ordersSagaWatcher() {
    yield takeEvery(actions.getOrdersRequest.type, getOrdersRequestSagaWorker);
    yield takeEvery(actions.deleteOrderRequest.type, deleteOrdersRequestSagaWorker);
}

export const useOrdersActions = () => {
    const dispatch =  useDispatch();
    return {
        getOrders: () => dispatch(actions.getOrdersRequest()),
        deleteOrderRequest: (payload :any) => dispatch(actions.deleteOrderRequest(payload))
    };
};

export const useOrdersState = () => useSelector((state) =>  state.getOrdersResponse);

export default orders.reducer;