import { all, takeEvery } from 'redux-saga/effects';

import * as actionTypes from './authAction';
import { logout, authHandler, checkTimeLogout, requestForToken } from './authSaga';


export function* watchAuth(){
    yield all([takeEvery(actionTypes.AUTH_LOGOUT_INITIATE, logout),
         takeEvery(actionTypes.AUTH_LOGOUT_TIMEOUT, checkTimeLogout),
         takeEvery(actionTypes.AUTH_REQUEST_FOR_TOKEN, requestForToken),
        takeEvery(actionTypes.AUTH_VALIDITYCHECK, authHandler)])
    
}
