import React from 'react';
import classes from './Input.module.css';

const input = (props) =>{
    let inputElement = null;
    let displayErrors = null;
    let classforInput = [classes.Input];
    if(!props.valid && props.failedMessage){
        displayErrors =  (    <ul className={classes.failedMessage}>
        {props.failedMessage.map((message,i) =><li key={i}>*{message}</li>)}
        </ul>);
        classforInput.push(classes.Errored)
    }
    switch(props.elementType){
        case 'input':
            inputElement = <input className={classforInput.join(' ')} {...props.elementConfig} value={props.value} onChange={props.change}/>
            break;
        case 'textarea':
            inputElement = <textarea className={classforInput.join(' ')} {...props.elementConfig} value={props.value} onChange={props.change} />
            break;
        case 'dropdown':
                inputElement = (<select className={classforInput.join(' ')}  name={props.identifier} onChange={props.change}>
                    {
                            props.elementConfig.options? 
                            props.elementConfig.options.map(option=> <option key={option.value} value={option.value}>{option.displayValue}</option>)
                            :null

                        }
                        
                </select>)
                break;
    
        default:
            inputElement = <input className={classforInput.join(' ')} {...props.elementConfig} value={props.value} onChange={props.change}/>
    }


    return (<div className={classes.Element}>
        <label className={classes.Lable}>{props.label}</label>
        {inputElement}
       {displayErrors}
    
    </div>)
}

export default input;