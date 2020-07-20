import * as actionTypes from './ordersActions';
import axios from '../../axios-order';

const loadOrders = (orders) =>{
    return{
        type: actionTypes.INIT_ORDERS,
        payload: {
            orders: orders
        }
    }
}

const failedtoLoadOrders = () =>{
    return{
        type: actionTypes.FAILED_ORDERS
    }
}


export const initOrders = (token) =>{
    return dispatch =>{
        const userId = localStorage.getItem('userId');
        axios.get('https://react-burger-builder-a479f.firebaseio.com/orders.json?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"')
    .then(resp=> 
        {
            if(resp.data){
                return         dispatch(loadOrders(resp.data))
            }
            throw new Error()
        }
)
    .catch(e=>dispatch(failedtoLoadOrders()))
    }
}