import * as actionTypes from './authAction';
import axios from 'axios';

const API_KEY = 'AIzaSyDyXMYwvdjMg7tXMu2bbiVG6Fc03Z_VcjA';

const authInit = () =>{
    return {
        type: actionTypes.AUTH_INIT
    }
}

export const clearError = () =>{
    return {
        type: actionTypes.CLEAR_ERROR
    }
}


const authFailed = (e) =>{
    return {
        type: actionTypes.AUTH_FAILED,
        error: e
    }
}

const authSuccess = (authData) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: authData
    }
}

export const authLogout = () =>{
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const logout = (expirationTime) =>{

    return dispatch =>{
        setTimeout(()=>{
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('expireTime');
           dispatch(authLogout())
        },expirationTime*1000)
    }
}

export const requestForToken = (credentials, isSignUp) =>{
    return dispatch=>{
        dispatch(authInit());
        credentials.returnSecureToken = true;
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        if(isSignUp){
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
        }
        axios.post(url,credentials)
        .then(res => {
            console.log(res)           
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.localId);
            localStorage.setItem('refreshToken', res.data.refreshToken)
            localStorage.setItem('expireTime', new Date(new Date().setMinutes(new Date().getMinutes()+Math.ceil(res.data.expiresIn/60))))

            dispatch(authSuccess({payload: {idToken: res.data.idToken}}))
            // dispatch(logout(res.data.expiresIn))
        }
)
        .catch(error => dispatch(authFailed(error)))
    }
}

export const requestForTokeWithRefreshToken = (refreshToken) =>{
    console.log('REFRESH TOKEN BLOCK')
    return dispatch =>{
        let url=`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;
        const authData = {
            refresh_token: refreshToken,
            grant_type: "refresh_token"
    
        }
        axios.post(url,authData)
        .then(res => {
            console.log(res)           
            localStorage.setItem('token', res.data.id_token);
            localStorage.setItem('userId', res.data.user_id);
            localStorage.setItem('refreshToken', res.data.refresh_token)
            // localStorage.setItem('expireTime', new Date(new Date().setMinutes(new Date().getMinutes()+Math.ceil(res.data.expires_in/60))))
            localStorage.setItem('expireTime', new Date(new Date().setMinutes(new Date().getMinutes()+Math.ceil(res.data.expires_in/60))))
            dispatch(authSuccess({payload: {idToken: res.data.id_token}}))
        }
    )
        .catch(error => dispatch(authFailed(error)))
    }

}


export const authHandler = () =>{

    return dispatch =>{
        dispatch(authInit());
        const currTimeStamp = new Date();
        if(localStorage.getItem('token')){
            dispatch(authSuccess({payload: {idToken: localStorage.getItem('token')}}))
            if(currTimeStamp > new Date(localStorage.getItem('expireTime'))){
                dispatch(requestForTokeWithRefreshToken(localStorage.getItem('refreshToken')))
            }
        }
    }
}

