import * as actionTypes from './ordersActions';

const initState = {
    orders: null,
    error: false
}

const reducer = (state=initState, action)=>{
    switch(action.type){
        case actionTypes.INIT_ORDERS:
            return {
                ...state,
                orders: action.payload.orders
            }
        case actionTypes.FAILED_ORDERS:
            return{
                ...state,
                error: !state.error
            }
        default:
            return state
    }
}


export default reducer;