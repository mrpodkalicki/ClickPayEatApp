import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import { useDispatch } from '../hooks/useDispatch';
import { useSelector } from '../hooks/useSelector';
import {API} from "../utilities/API";
const axios = require('axios');

const api = {
    signInAdminRequest:  (values: any) => {
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
    signUpAdminRequest: (requestForm :any) => {
        try{
            return axios.post( API + '/admin/signup',{
                email:  requestForm.email,
                password: requestForm.password
            });
           
        } catch (err) {
            return err
        }
    }
};

const signAdmin = createSlice({
    name: 'signAdmin',
    initialState: {
        status: '',
        data: '',
        error: '',
    },
    reducers: {
        signInAdminRequest: (state, _action: PayloadAction<any>) => {
            state.status = 'loading';
            state.error = '';
        },
        signInAdminSuccess: (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.data = action.payload;
            state.error = '';
        },
        signInAdminFailure: (state, action:PayloadAction<string>) => {
            state.status = 'failure';
            state.error = action.payload;
        },
        signUpAdminRequest: (state, _action: PayloadAction<any>) => {
            state.status = 'loading';
            state.error = '';
        },
        signUpAdminSuccess: (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.data = action.payload;
            state.error = '';
        },
        signUpAdminFailure: (state, action:PayloadAction<any>) => {
            state.status = 'failure';
            state.error = action.payload;
        },
    },
});

const { actions } = signAdmin;

function* signInRequestSagaWorker({ payload }: any) {
    try {
        const response: any = yield api.signInAdminRequest(payload);
        yield put(actions.signInAdminSuccess(response));
    } catch (ex) {
        yield put(actions.signInAdminFailure(ex.message));
    }
}

function* signUpRequestSagaWorker({ payload }: any) {
    try {
        const response: any = yield api.signUpAdminRequest(payload);
        yield put(actions.signUpAdminSuccess(response));
    } catch (err) {
        yield put(actions.signUpAdminFailure(err.message));
    }
}

export function* signAdminSagaWatcher() {
    yield takeEvery(actions.signInAdminRequest.type, signInRequestSagaWorker);
    yield takeEvery(actions.signUpAdminRequest.type, signUpRequestSagaWorker);
}

export const useSignAdminActions = () => {
    const dispatch = useDispatch();

    return {
        signInAdmin: (payload: any) => dispatch(actions.signInAdminRequest(payload)),
        singUpAdmin: (payload: any) => dispatch(actions.signUpAdminRequest(payload)),
    };
};

export const useSignAdminState= () => useSelector((state) => state.signAdminResponse);

export default signAdmin.reducer;