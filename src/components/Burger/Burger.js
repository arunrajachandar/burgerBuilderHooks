import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props)=>{
        let transformedIngredients = Object.keys(props.ingredients).map(ingredientName=>
          [...Array(props.ingredients[ingredientName])].map((_,i)=>
            <BurgerIngredients type={ingredientName} key={ingredientName+i}/>
          )
        ).reduce((acc, e)=>acc.concat(e),[]);
        if(transformedIngredients.length===0){
            transformedIngredients = <p>Please start adding ingredients</p>
        }
    return (<div className={classes.Burger}>
        <BurgerIngredients type="bread-top"/>
        {transformedIngredients}
        <BurgerIngredients type="bread-bottom"/>

    </div>);
}


export default burger;