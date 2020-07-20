import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/ingredients/ingredientsActions';
import * as burgerActionCreators from '../../store/ingredients/ingredientsActionCreators';
import * as contactDataActionCreators from '../../store/contactData/contactDataActionCreators';

// const INGREDIENT_PRICES ={
//     salad: 0.5,
//     meat: 1,
//     cheese: 0.75,
//     bacon: 0.9
// }

export class BurgerBuilder extends Component {
    state ={
        // ingredients : null, 
        // totalPrice: 4,
        // purchaseable: false,
        purchasing: false
    }

    componentDidMount(){
        // axios.get('./ingredients.json')
        // .then(resp=>this.setState({ingredients: resp.data}))
        // .catch(error => this.setState({error: true}))
        if(!this.props.purchaseable || !this.props.isAuth){
            this.props.loadIngredients();
        }
    }
    updatePurchaseableState = (ingredients)=>{
        const sum = Object.keys(ingredients).reduce((acc,igKey)=>
            acc+ingredients[igKey],0);
        return sum>0
    }
    // addIngredients=(type)=>{
    //     const copyState = {...this.state};

    //     copyState.ingredients[type] += 1;
    //     copyState.totalPrice += INGREDIENT_PRICES[type];        
    //     this.setState({
    //         ingredients: copyState.ingredients,
    //         totalPrice: copyState.totalPrice
    //     })
    //     this.updatePurchaseableState(copyState.ingredients);
    // }
    // removeIngredients=(type)=>{
    //     const copyState = {...this.state};
    //     if(copyState.ingredients[type]<=0){
    //         return;
    //     }
    //     copyState.ingredients[type] -= 1;
    //     copyState.totalPrice -= INGREDIENT_PRICES[type];        
    //     this.setState({
    //         ingredients: copyState.ingredients,
    //         totalPrice: copyState.totalPrice
    //     })
    //     this.updatePurchaseableState(copyState.ingredients);
    // }
    purchasingHandler = ()=>{
        if(this.props.isAuth){
            this.setState({
                purchasing: true
            })
    
        }else{
            this.props.history.push('/auth')
        }
    }
    purchasingCancelHandler = ()=>{
        this.setState({
            purchasing: false
        })
    }
    purchasingContinueHandler = ()=>{
        // this.setState({loading: true})
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer:{
        //         name: 'Arun',
        //         email: 'arun@gmail.com',
        //         address: {
        //             street:'No. 6, Jayalakshmi Nagar',
        //             city: 'Nellikuppam',
        //             state: 'Tamil Nadu',
        //             pincode: '607105'
        //         }
        //     },
        //     deliveryType: 'fastest'
        // }

        // axios.post('/orders.json',order)
        // .then(res=>this.setState({loading: false, purchasing: false}))
        // .catch(error=> this.setState({loading: false, purchasing:false}));
        // const queryParams = []
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        // }

        // queryParams.push("price="+this.state.totalPrice)
        // const queryString = queryParams.join('&');
        this.props.onInitPurchase();
        this.props.history.push({
            pathname:'/checkout'
            // ,
            // search: '?'+queryString
        })

    }


    render(){

        const disabledInfo = {...this.props.ingredients};
        for( let key in disabledInfo ){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary =null;
        let burger = this.props.error && this.props.ingredients === null ? <Aux>Ingredients can not be loaded</Aux>:<Spinner />;

        if(this.props.ingredients){
            burger=(
                <Aux>
                     <Burger ingredients={this.props.ingredients} />
                <BurgerControls addIng={this.props.addIngredients}
                removeIng={this.props.removeIngredients}
                disabled = {disabledInfo}
                totPrice={this.props.totalPrice}
                purchasing={this.purchasingHandler}
                purchaseable={this.updatePurchaseableState(this.props.ingredients)}
                isAuth ={this.props.isAuth}/>
                </Aux>
            )
            orderSummary =(                    <OrderSummary ingredients={this.props.ingredients} 
                cancel={this.purchasingCancelHandler} 
                continue={this.purchasingContinueHandler}
                totPrice={this.props.totalPrice}
    />);
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.purchasingCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}

            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    // console.log(state)
    return {
        ingredients: state.ings.ingredients,
        totalPrice: state.ings.totalPrice,
        purchaseable: state.ings.purchaseable,
        error: state.ings.error,
        isAuth: state.auth.authenticatedData ? state.auth.authenticatedData.payload.idToken !== null : false

    }
}

const dispatchActions = dispatch =>{
    return {
        addIngredients: (ingredientName)=> dispatch(burgerActionCreators.addIngredients(ingredientName)),
        removeIngredients: (ingredientName)=> dispatch(burgerActionCreators.removeIngredients(ingredientName)),
        loadIngredients: () => dispatch(burgerActionCreators.initIngredients()),
        onInitPurchase: () => dispatch(contactDataActionCreators.purchaseInit())
    }
}

export default connect(mapStateToProps,dispatchActions)(withErrorHandler(BurgerBuilder, axios));