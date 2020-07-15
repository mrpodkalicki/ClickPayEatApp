import {API} from "../utilities/API";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {put, takeEvery} from "redux-saga/effects";
import {useDispatch} from "../hooks/useDispatch";
import {useSelector} from "../hooks/useSelector";
const axios = require('axios');
const api = {
    getMenuRequest: (idRestaurant: string) => {
        try {
            return axios.get(API + `/menu/${idRestaurant}`);
        } catch (err) {
            return err
        }
    },
    addMealRequest: (values: any) => {
        try {
            return axios.post(API + '/menu/add-meal',
                {
                    restaurantId: values.restaurantId,
                    name: values.name,
                    description:values.description,
                    price: values.price
                });
        } catch (err) {
            return err
        }
    },
    deleteMealRequest: (id: string) => {
        try {
            return axios.delete(API + `/menu/meal/${id}`);
        } catch (err) {
            return err
        }
    }
}

const meals = createSlice({
    name: 'meals',
    initialState: {
        status: '',
        data: '',
        error: '',
    },
    reducers: {
        getMenuRequest: (state,_action:PayloadAction<any>) => {
            state.status = 'loading';
            state.error = '';
        },
        getMenuSuccess: (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.data = action.payload;
            state.error = '';
        },
        getMenuFailure: (state, action:PayloadAction<string>) => {
            state.status = 'failure';
            state.error = action.payload;
        },
        addMealRequest: (state,_action:PayloadAction<any>) => {
            state.status = 'loading';
            state.error = '';
        },
        addMealSuccess: (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.data = action.payload;
            state.error = '';
        },
        addMealFailure: (state, action:PayloadAction<string>) => {
            state.status = 'failure';
            state.error = action.payload;
        },
        deleteMealRequest: (state, _action:PayloadAction<any>) => {
            state.status = 'loading';
            state.error = '';
        },
        deleteMealSuccess: (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.data = action.payload;
            state.error = '';
        },
        deleteMealFailure: (state, action:PayloadAction<string>) => {
            state.status = 'failure';
            state.error = action.payload;
        },
    }
});

const { actions } = meals;

function* getMenuRequestSagaWorker({ payload }: any) {
    try {
        const response: any = yield api.getMenuRequest(payload);
        yield put(actions.getMenuSuccess(response));
    } catch (ex) {
        yield put(actions.getMenuFailure(ex.message));
    }
}

function* addMealRequestSagaWorker({ payload }: any) {
    try {
        const response: any = yield api.addMealRequest(payload);
        yield put(actions.addMealSuccess(response));
    } catch (ex) {
        yield put(actions.addMealFailure(ex.message));
    }
}

function* deleteMealRequestSagaWorker({ payload }: any) {
    try {
        const response: any = yield api.deleteMealRequest(payload);
        yield put(actions.deleteMealSuccess(response));
    } catch (ex) {
        yield put(actions.deleteMealFailure(ex.message));
    }
}

export function*mealsSagaWatcher() {
    yield takeEvery(actions.getMenuRequest.type, getMenuRequestSagaWorker);
    yield takeEvery(actions.addMealRequest.type, addMealRequestSagaWorker);
    yield takeEvery(actions.deleteMealRequest.type, deleteMealRequestSagaWorker);
}

export const useMealsActions = () => {
    const dispatch =  useDispatch();
    return {
        getMenuRequest: (payload: any) => dispatch(actions.getMenuRequest(payload)),
        addMealRequest: (payload: any) => dispatch(actions.addMealRequest(payload)),
        deleteMealRequest: (payload: any) => dispatch(actions.deleteMealRequest(payload)),
    };
};

export const useMealsState = () => useSelector((state) =>  state.getMealsResponse);


export default meals.reducer;