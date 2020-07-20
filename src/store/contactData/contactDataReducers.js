import * as actionTypes from './contactDataActions';
import {updateObject} from '../utility';

const initalState = {
    orders: [],
    loading: false,
    error: '',
    purchasing: false
}

const purchaseInit = (state) =>{
    return updateObject(state,{purchasing: false})
}

const purchaseSuccess = (state,action) =>{
    return updateObject(state,{orders: state.orders.concat(action.payload),
        loading: !state.loading,
        purchasing: true})
}

const purchaseFailed = (state,action) =>{
    return updateObject(state,{                error: action.error,
        loading: !state.loading
})
}

const purchaseLoading = (state) =>{
    return updateObject(state,{                loading: !state.loading})
}

const reducer = (state=initalState, action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state)
        case actionTypes.PURCHASE_SUCCESS:
            return purchaseSuccess(state, action)
        case actionTypes.PURCHASE_FAILED:
            return purchaseFailed(state, action)
        case actionTypes.PURCHASE_LOADING:
            return purchaseLoading(state)
        default:
            return state
    }
}

export default reducer;