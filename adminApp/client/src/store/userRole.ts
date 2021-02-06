import {API} from "../utilities/API";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import { useDispatch } from '../hooks/useDispatch';
import { useSelector } from '../hooks/useSelector';
const axios = require('axios');


const api = {
    getUserRoleRequest:  (userEmail: any) => {
        try{
            const response = axios.get( API + '/admin/role/' + userEmail)
            return response
        } catch (err) {
            return err
        }
    }
}

const userRole = createSlice({
    name: 'getUserRole',
    initialState: {
        status: '',
        data: '',
        error: '',
    },
    reducers: {
        getUserRoleRequest: (state, _action: PayloadAction<any>) => {
            state.status = 'loading';
            state.error = '';
        },
        getUserRoleSuccess: (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.data = action.payload;
            state.error = '';
        },
        getUserRoleFailure: (state, action:PayloadAction<string>) => {
            state.status = 'failure';
            state.error = action.payload;
        }
    }
});

const {actions} = userRole;

function* getUserRoleRequestSagaWorker({ payload }: any) {
    try {
        const response: any = yield api.getUserRoleRequest(payload);
        yield put(actions.getUserRoleSuccess(response));
    } catch (ex) {
        yield put(actions.getUserRoleFailure(ex.message));
    }
}

export function*getUserRoleSagaWatcher() {
    yield takeEvery(actions.getUserRoleRequest.type, getUserRoleRequestSagaWorker);
}

export const useRestaurantActions = () => {
    const dispatch =  useDispatch();
    return {
        getUserRole: (payload: any) => dispatch(actions.getUserRoleRequest(payload)),
       
    };
};


export const useRestaurantState = () => useSelector((state) =>  state.getUserRoleResponse);

export default userRole.reducer;