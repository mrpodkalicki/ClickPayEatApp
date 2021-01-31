import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import { useDispatch } from '../hooks/useDispatch';
import { useSelector } from '../hooks/useSelector';
import {API} from "../utilities/API";
const axios = require('axios');


const api = {
    getRestaurantsRequest: () => {
        try{
            return axios.get( API + '/offers');
        } catch (err) {
            return err
        }
    },
    addRestaurantRequest: (values: any) => {
        try{
            return axios.post( API + '/offer',
                {
                    cuisine: values.cuisine,
                    name: values.name,
                    address: values.address,
                    category: values.category
                })
        } catch (err) {
            return err
        }
    },
    deleteRestaurantRequest: (id: string) => {
        try{
            return axios.delete( API + `/offer/${id}`);
        } catch (err) {
            return err
        }
    },
};

const restaurants = createSlice({
    name: 'restaurants',
    initialState: {
        status: '',
        data: '',
        error: '',
    },
    reducers: {
        getRestaurantsRequest: (state) => {
            state.status = 'loading';
            state.error = '';
        },
        getRestaurantsSuccess: (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.data = action.payload;
            state.error = '';
        },
        getRestaurantsFailure: (state, action:PayloadAction<string>) => {
            state.status = 'failure';
            state.error = action.payload;
        },
        addRestaurantRequest: (state, _action:PayloadAction<any>) => {
            state.status = 'loading';
            state.error = '';
        },
        addRestaurantSuccess: (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.data = action.payload;
            state.error = '';
        },
        addRestaurantFailure: (state, action:PayloadAction<string>) => {
            state.status = 'failure';
            state.error = action.payload;
        },
        deleteRestaurantRequest: (state, _action:PayloadAction<any>) => {
            state.status = 'loading';
            state.error = '';
        },
        deleteRestaurantSuccess: (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.data = action.payload;
            state.error = '';
        },
        deleteRestaurantFailure: (state, action:PayloadAction<string>) => {
            state.status = 'failure';
            state.error = action.payload;
        },
    }
});

const { actions } = restaurants;

function* getRestaurantsRequestSagaWorker() {
    try {
        const response: any = yield api.getRestaurantsRequest();
        yield put(actions.getRestaurantsSuccess(response));
    } catch (ex) {
        yield put(actions.getRestaurantsFailure(ex.message));
    }
}

function* addRestaurantRequestSagaWorker({ payload }: any) {
    try {
        const response: any = yield api.addRestaurantRequest(payload);
        yield put(actions.addRestaurantSuccess(response));
    } catch (ex) {
        yield put(actions.addRestaurantFailure(ex.message));
    }
}

function* deleteRestaurantsRequestSagaWorker({ payload }: any) {
    try {
        const response: any = yield api.deleteRestaurantRequest(payload);
        yield put(actions.deleteRestaurantSuccess(response));
    } catch (ex) {
        yield put(actions.deleteRestaurantFailure(ex.message));
    }
}

export function*restaurantsSagaWatcher() {
    yield takeEvery(actions.getRestaurantsRequest.type, getRestaurantsRequestSagaWorker);
    yield takeEvery(actions.addRestaurantRequest.type, addRestaurantRequestSagaWorker);
    yield takeEvery(actions.deleteRestaurantRequest.type, deleteRestaurantsRequestSagaWorker);
}

export const useRestaurantActions = () => {
    const dispatch =  useDispatch();
    return {
        getRestaurants: () => dispatch(actions.getRestaurantsRequest()),
        addRestaurant: (payload: any) => dispatch(actions.addRestaurantRequest(payload)),
        deleteRestaurant: (payload: any) => dispatch(actions.deleteRestaurantRequest(payload)),
    };
};

export const useRestaurantState = () => useSelector((state) =>  state.getRestaurantsResponse);


export default restaurants.reducer;