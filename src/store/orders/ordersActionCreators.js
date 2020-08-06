import * as actionTypes from './ordersActions';

export const loadOrders = (orders) =>{
    return{
        type: actionTypes.INIT_ORDERS,
        payload: {
            orders: orders
        }
    }
}

export const failedtoLoadOrders = () =>{
    return{
        type: actionTypes.FAILED_ORDERS
    }
}


export const initOrders = (token) =>{
    return {
        type: actionTypes.RETRIEVE_ORDERS,
        token: token
    }
}