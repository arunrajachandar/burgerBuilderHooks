import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckOutSummary.module.css';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props)=>{
    return(
        <div className={classes.Checkout}>
            <h1>
                Well! The burger will suit your taste!
            </h1>
            <div className={classes.BurgerSummary}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType={'Danger'} clicked={props.cancel}>CANCEL</Button>
            <Button btnType={'Success'} clicked={props.continue}>CONTINUE</Button>

        </div>
    )
}

export default checkoutSummary;