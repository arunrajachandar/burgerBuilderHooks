import * as actionTypes from './contactDataActions';
import axios from '../../axios-order';

const purchaseSuccess = (orderId, orderData) =>{
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        payload:{
            id: orderId    
        }
    }
}

const purchaseFailed = (e) =>{
    return {
        type: actionTypes.PURCHASE_FAILED,
        error: e
    }
}

 const purchaseLoading = () =>{
    return {
        type: actionTypes.PURCHASE_LOADING
    }
}

export const purchaseInit = () =>{
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseInitiate = (orderData, token) =>{
    return dispatch =>{
        dispatch(purchaseLoading());
        const userId = localStorage.getItem('userId');
        orderData.userId = userId
        axios.post('/orders.json?auth='+token,orderData)
        .then(res=>{
            if(res.data.name){
                return dispatch(purchaseSuccess(res.data.name))
            }else{
                throw new Error('Form submission error')
            }
            // this.props.history.push('/')
        }
            
            )
        .catch(e=>
            dispatch(purchaseFailed(e))
        );

    }
}

