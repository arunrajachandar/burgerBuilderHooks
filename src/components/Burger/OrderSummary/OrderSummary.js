import React from 'react';
import Aux from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';
const orderSummary = (props) =>{
    const ingredientSummary = Object.keys(props.ingredients)
    .map((igKey)=>
         <li key={igKey}>
             <span style={{textTransform: 'uppercase'}}>
                 {igKey}</span>: {props.ingredients[igKey]}</li>
        ).reduce((sum, el)=> sum.concat(el),[])
    return (
        <Aux>
            <h3>Your Order: </h3>
            <p>Your Delicious Burger made with following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : ${props.totPrice.toFixed(2)}</strong></p>
            <p>Continue To Checkout?</p>
            <Button btnType="Success" clicked={props.continue}>Continue</Button>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
        </Aux>
    )
}

export default orderSummary;