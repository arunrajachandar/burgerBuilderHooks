import * as actionTypes from './authAction';

const initalState = {
    authenticatedData: null,
    loading: false,
    error: null
}

const reducer = (state = initalState, action)=>{
    switch(action.type){
        case actionTypes.AUTH_INIT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                loading: false,
                authenticatedData: action.payload
            }
        case actionTypes.AUTH_FAILED:
            return{
                ...state,
                loading: false,
                error: action.error.response.data.message                
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                error: null,
                loading: false,
                authenticatedData: null
            }
        case actionTypes.CLEAR_ERROR:
            return{
                ...state,
                error: null
            }
        default:
            return state
    }

}


export default reducer;