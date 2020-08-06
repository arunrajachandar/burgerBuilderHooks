import { put, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import { authLogout, logoutInitiate, authInit, requestForTokeWithRefreshToken, checkTimeOut, authSuccess, authFailed} from './authActionCreators';

const API_KEY = 'AIzaSyDyXMYwvdjMg7tXMu2bbiVG6Fc03Z_VcjA';

export function* logout(action){
    yield call([localStorage, 'removeItem'],"token")
    yield call([localStorage, 'removeItem'],"userId")
    yield call([localStorage, 'removeItem'],"refreshToken")
    yield call([localStorage, 'removeItem'],"expireTime")
    yield put(authLogout())
}

export function* checkTimeLogout(action){
    yield delay(action.expirationTime*1000)
    yield put(logoutInitiate())
}

export function* requestForToken(action){
    yield put(authInit());
    action.credentials.returnSecureToken = true;
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    if(action.isSignUp){
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    }
    try{
        const res = yield axios.post(url, action.credentials)
     
        yield localStorage.setItem('token', res.data.idToken);
        yield localStorage.setItem('userId', res.data.localId);
        yield localStorage.setItem('refreshToken', res.data.refreshToken)
        yield localStorage.setItem('expireTime', new Date(new Date().setMinutes(new Date().getMinutes()+Math.ceil(res.data.expiresIn/60))))

        yield put(authSuccess({payload: {idToken: res.data.idToken}}))
        yield put(checkTimeOut(res.data.expiresIn))
    }catch(error){
        yield put(authFailed(error))        
    }
}

export function* authHandler(action){
    yield put(authInit());
    const currTimeStamp = yield new Date();
    const token = yield localStorage.getItem('token')
    if(token){
        yield put(authSuccess({payload: {idToken: token}}))
        const expiryTime = yield localStorage.getItem('expireTime')
        if(currTimeStamp > new Date(expiryTime)){
            const refreshToken = yield localStorage.getItem('refreshToken')
            yield put (requestForTokeWithRefreshToken(refreshToken))
        }
    }

}