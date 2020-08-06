import * as actionTypes from './authAction';
import axios from 'axios';

const API_KEY = 'AIzaSyDyXMYwvdjMg7tXMu2bbiVG6Fc03Z_VcjA';

export const authInit = () =>{
    return {
        type: actionTypes.AUTH_INIT
    }
}

export const clearError = () =>{
    return {
        type: actionTypes.CLEAR_ERROR
    }
}


export const authFailed = (e) =>{
    return {
        type: actionTypes.AUTH_FAILED,
        error: e
    }
}

export const authSuccess = (authData) =>{
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

export const logoutInitiate = () =>{
    return{
        type: actionTypes.AUTH_LOGOUT_INITIATE

    }
}


export const checkTimeOut = (expirationTime) =>{
    return {
        type: actionTypes.AUTH_LOGOUT_TIMEOUT,
        expirationTime: expirationTime
    }

}

export const requestForToken = (credentials, isSignUp) =>{
    return {
        type: actionTypes.AUTH_REQUEST_FOR_TOKEN,
        credentials: credentials,
        isSignUp: isSignUp
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

    return {
        type: actionTypes.AUTH_VALIDITYCHECK
    }
}

