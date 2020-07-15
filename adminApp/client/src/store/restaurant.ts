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
            const response =   axios.post( API + '/offer',
                {
                    cuisine: values.cuisine,
                    name: values.name,
                    address: values.address,
                    category: values.category
                })
            return response
        } catch (err) {
            return err
        }
    }
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

export function*getRestaurantsSagaWatcher() {
    yield takeEvery(actions.getRestaurantsRequest.type, getRestaurantsRequestSagaWorker);
    yield takeEvery(actions.addRestaurantRequest.type, addRestaurantRequestSagaWorker);
}

export const useRestaurantActions = () => {
    const dispatch =  useDispatch();
    return {
        getRestaurants: () => dispatch(actions.getRestaurantsRequest()),
        addRestaurant: (payload: any) => dispatch(actions.addRestaurantRequest(payload)),
    };
};

export const useReastaurantState = () => useSelector((state) =>  state.getRestaurantsResponse);
export const useAddReastaurantState = () => useSelector((state) =>  state.addRestaurantResponse);

export default restaurants.reducer;