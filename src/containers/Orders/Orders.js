import React,{useEffect} from 'react';
import Order from '../../components/Order/Order';
import Aux from '../../hoc/Auxilary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useSelector, useDispatch} from 'react-redux';
import * as actionCreators from '../../store/orders/ordersActionCreators';

const Orders = React.memo((props)=>{
    const orders = useSelector(state=> state.orders.orders)
    const error = useSelector(state=> state.orders.error)
    const token = useSelector(state=> state.auth.authenticatedData)
    const dispatch = useDispatch();
    useEffect(()=>{
        if(token){
            dispatch(actionCreators.initOrders(token.payload.idToken));
        }
    }, [token, dispatch])
        // axios.get('https://react-burger-builder-a479f.firebaseio.com/orders.json')
        // .then(res=>{
        //     console.log(res.data)
        //     this.setState({loading: false, orders: res.data})
        // })
        // .catch(error => this.setState({loading: false,error: true}))
        let ordersSummary = null;
        ordersSummary = error || !token || orders ? !token?<Aux>You're not authorised to view the orders</Aux>:<Aux>Orders can not be retrieved</Aux> : <Spinner />
 
        if(orders){
            let completeOrders = []

            for ( let order in orders){

                completeOrders.push(<Order orderDetails ={orders[order]} id={order}  key={order}/>)
            }
            ordersSummary = completeOrders
        }

        return (
            <Aux>
                {ordersSummary}
            </Aux>
        )
})

// const mapStateToProps = state =>{
//     return {
//         orders: state.orders.orders,
//         error: state.orders.error,
//         token: state.auth.authenticatedData
//     }
// }

// const dispatchActions = dispatch =>{
//     return {
//         loadOrders: (token)=> dispatch(actionCreators.initOrders(token))
//     }
// }

export default (withErrorHandler(Orders, axios));