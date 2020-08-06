import { takeEvery } from 'redux-saga/effects';
import { retrieveOrders} from './ordersSaga';
import * as actionTypes from './ordersActions';

export function* watchOrders(){
    yield takeEvery(actionTypes.RETRIEVE_ORDERS, retrieveOrders)
}