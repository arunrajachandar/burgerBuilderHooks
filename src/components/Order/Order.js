import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    console.log(props);

    const ingredientSplitUps = []
    for (let ingredient in props.orderDetails.ingredients)
    {
    ingredientSplitUps.push(<span key={ingredient} style={{textTransform: 'capitalize'}}>{ingredient}(<strong>{props.orderDetails.ingredients[ingredient]}</strong>) </span>)
    }
    return(
    <div className={classes.Order}>
        <p>Ingredients: {ingredientSplitUps}</p>
        <p>Price: <strong>USD {props.orderDetails.price}</strong></p>
    </div>
    );
}

export default order;