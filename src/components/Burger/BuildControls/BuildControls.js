import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]


const buildControl = (props)=>{
    return (<div className={classes.BuildControls}>
        <p>Current Price : <strong>${props.totPrice.toFixed(2)}</strong></p>
        {controls.map(ctrls=>
        <BuildControl key={ctrls.label} label={ctrls.label} 
        added={()=>props.addIng(ctrls.type)}
        removed={()=>props.removeIng(ctrls.type)}
        disabled={props.disabled[ctrls.type]}
        />)}
        <button className={classes.OrderButton} onClick={props.purchasing} disabled={!props.purchaseable}>{props.isAuth ? "Order Now!":"Sign Up to Order!"}</button>
    </div>)
}

export default buildControl;