import React from 'react';
import Order from '../../components/Order/Order';
import Aux from '../../hoc/Auxilary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/orders/ordersActionCreators';

class Orders extends React.Component{
    componentDidMount(){
        // axios.get('https://react-burger-builder-a479f.firebaseio.com/orders.json')
        // .then(res=>{
        //     console.log(res.data)
        //     this.setState({loading: false, orders: res.data})
        // })
        // .catch(error => this.setState({loading: false,error: true}))
        if(this.props.token){
            this.props.loadOrders(this.props.token.payload.idToken);
        }
        }
    
    render(){
        let ordersSummary = null;
        ordersSummary = this.props.error || !this.props.token ? !this.props.token?<Aux>You're not authorised to view the orders</Aux>:<Aux>Orders can not be retrieved</Aux> : <Spinner />

        if(this.props.orders){
            let orders = []
            for ( let order in this.props.orders){
                orders.push(<Order orderDetails ={this.props.orders[order]} id={order}  key={order}/>)
            }
            ordersSummary = orders
        }else {
        }

        return (
            <Aux>
                {ordersSummary}
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return {
        orders: state.orders.orders,
        error: state.orders.error,
        token: state.auth.authenticatedData
    }
}

const dispatchActions = dispatch =>{
    return {
        loadOrders: (token)=> dispatch(actionCreators.initOrders(token))
    }
}

export default connect(mapStateToProps,dispatchActions)(withErrorHandler(Orders, axios));