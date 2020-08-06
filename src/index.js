import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import ingredientsReducer from './store/ingredients/ingredientsReducer';
import ordersReducers from './store/orders/ordersReducers';
import contactDataReducers from './store/contactData/contactDataReducers';
import authReducer from './store/auth/authReducer';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createReduxSaga from 'redux-saga';
import { watchAuth } from './store/auth/sagaAuthListener';
import { watchOrders } from './store/orders/sagaOrdersListener';

const rootReducer = combineReducers({
  ings: ingredientsReducer,
  orders: ordersReducers,
  cD: contactDataReducers,
  auth: authReducer
})
 const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const sagaInstance = createReduxSaga();

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, sagaInstance)
));

sagaInstance.run(watchAuth)
sagaInstance.run(watchOrders)



ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>

    </Provider>
,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
