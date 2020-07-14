import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import { useDispatch } from '../hooks/useDispatch';
import { useSelector } from '../hooks/useSelector';
import {API} from "../utilities/API";
const axios = require('axios');

const api = {
    signInRequest:  (values: any) => {
        try{
            const response =   axios.post( API + '/admin/login',
            {
                email: values.email,
                password: values.password
            })
            return response
        } catch (err) {
            return err
        }
    },
    setSignInRequest: (values: any) => {
        return values;
    }
};

const signIn = createSlice({
    name: 'signIn',
    initialState: {
        status: '',
        data: '',
        error: '',
    },
    reducers: {
        signInRequest: (state, _action: PayloadAction<any>) => {
            state.status = 'loading';
            state.error = '';
        },
        signInSuccess: (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.data = action.payload;
            state.error = '';
        },
        signInFailure: (state, action:PayloadAction<string>) => {
            state.status = 'failure';
            state.error = action.payload;
        },
        setSignInRequest: (state, _action: PayloadAction<any>) => {
            state.status = 'loading';
            state.error = '';
        },
        setSignInSuccess: (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.data = action.payload;
            state.error = '';
        },
        setSignInFailure: (state, action:PayloadAction<any>) => {
            state.status = 'failure';
            state.error = action.payload;
        },
    },
});

const { actions } = signIn;

function* signInRequestSagaWorker({ payload }: any) {
    try {
        const response: any = yield api.signInRequest(payload);
        yield put(actions.signInSuccess(response));
    } catch (ex) {

        yield put(actions.signInFailure(ex.message));
    }
}

function* setSignInSagaWorker({ payload }: any) {
    try {
        const response: any = yield api.setSignInRequest(payload);
        yield put(actions.setSignInSuccess(response));
    } catch (err) {
        yield put(actions.setSignInFailure(err.message));
    }
}

export function* signInSagaWatcher() {
    yield takeEvery(actions.signInRequest.type, signInRequestSagaWorker);
    yield takeEvery(actions.setSignInRequest.type, setSignInSagaWorker);
}

export const useSignInActions = () => {
    const dispatch =  useDispatch();

    return {
        signIn: (payload: any) => dispatch(actions.signInRequest(payload)),
        setSignInResponse: (payload: any) => dispatch(actions.setSignInRequest(payload)),
    };
};

export const useSignInState = () => useSelector((state) => state.signInResponse);

export default signIn.reducer;