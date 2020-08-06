import * as actionCreators from './ordersActionCreators';
import { put } from 'redux-saga/effects';
import axios from '../../axios-order';

export function* retrieveOrders(action){
    const userId = yield localStorage.getItem('userId');
    try{
        const resp = yield axios.get('https://react-burger-builder-a479f.firebaseio.com/orders.json?auth='+action.token+'&orderBy="userId"&equalTo="'+userId+'"')
        yield put(actionCreators.loadOrders(resp.data))
    }catch(error){
        yield put(actionCreators.failedtoLoadOrders())
    }
}