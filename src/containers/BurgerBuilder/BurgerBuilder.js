import React, { useState, useEffect } from 'react';
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

export const BurgerBuilder = props => {
    const { purchaseable, isAuth, loadIngredients, totalPrice, ingredients, error, onInitPurchase,addIngredients, removeIngredients, history} = props;
    const [purchasing, setPurchasing] = useState(false)
    

    useEffect(()=>{
        // axios.get('./ingredients.json')
        // .then(resp=>setState({ingredients: resp.data}))
        // .catch(error => setState({error: true}))
        if(!purchaseable || !isAuth){
            loadIngredients();
        }
    },[purchaseable, isAuth, loadIngredients])

    const updatePurchaseableState = (ingredients)=>{
        const sum = Object.keys(ingredients).reduce((acc,igKey)=>
            acc+ingredients[igKey],0);
        return sum>0
    }
    // addIngredients=(type)=>{
    //     const copyState = {...};

    //     copyState.ingredients[type] += 1;
    //     copyState.totalPrice += INGREDIENT_PRICES[type];        
    //     setState({
    //         ingredients: copyState.ingredients,
    //         totalPrice: copyState.totalPrice
    //     })
    //     updatePurchaseableState(copyState.ingredients);
    // }
    // removeIngredients=(type)=>{
    //     const copyState = {...};
    //     if(copyState.ingredients[type]<=0){
    //         return;
    //     }
    //     copyState.ingredients[type] -= 1;
    //     copyState.totalPrice -= INGREDIENT_PRICES[type];        
    //     setState({
    //         ingredients: copyState.ingredients,
    //         totalPrice: copyState.totalPrice
    //     })
    //     updatePurchaseableState(copyState.ingredients);
    // }
    const purchasingHandler = ()=>{
        if(isAuth){
            setPurchasing(true)
    
        }else{
            history.push('/auth')
        }
    }
    const purchasingCancelHandler = ()=>{
         setPurchasing(false)
    }
    const purchasingContinueHandler = ()=>{
        // setState({loading: true})
        // const order = {
        //     ingredients: .ingredients,
        //     price: .totalPrice,
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
        // .then(res=>setState({loading: false, purchasing: false}))
        // .catch(error=> setState({loading: false, purchasing:false}));
        // const queryParams = []
        // for(let i in .ingredients){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(.ingredients[i]))
        // }

        // queryParams.push("price="+.totalPrice)
        // const queryString = queryParams.join('&');
        onInitPurchase();
        history.push({
            pathname:'/checkout'
            // ,
            // search: '?'+queryString
        })

    }



        const disabledInfo = {...ingredients};
        for( let key in disabledInfo ){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary =null;
        let burger = error && ingredients === null ? <Aux>Ingredients can not be loaded</Aux>:<Spinner />;

        if(ingredients){
            burger=(
                <Aux>
                     <Burger ingredients={ingredients} />
                <BurgerControls addIng={addIngredients}
                removeIng={removeIngredients}
                disabled = {disabledInfo}
                totPrice={totalPrice}
                purchasing={purchasingHandler}
                purchaseable={updatePurchaseableState(ingredients)}
                isAuth ={isAuth}/>
                </Aux>
            )
            orderSummary =(                    <OrderSummary ingredients={ingredients} 
                cancel={purchasingCancelHandler} 
                continue={purchasingContinueHandler}
                totPrice={totalPrice}
    />);
        }

        return(
            <Aux>
                <Modal show={purchasing} clicked={purchasingCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}

            </Aux>
        )
    
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