import React, {useState} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import Aux from '../../../hoc/Auxilary';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {purchaseInitiate} from '../../../store/contactData/contactDataActionCreators';
import {initIngredients } from '../../../store/ingredients/ingredientsActionCreators';

import { Redirect } from 'react-router-dom';

const ContactData = (props) =>{
    // state={
    //     formTouched: false,
    //     overallValidity: false,
    //     // loading: false,
    //     formError: null,
    //     displayAuthMessage : false
    // }
    
    const [formTouched, setFormTouched] = useState(false)
    const [displayAuthMessage, setDisplayAuthMessage] = useState(false)
    const [formError, setFormError] = useState(null)
    const [overallValidity, setOverallValidity] = useState(false)
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type:'text',
                placeholder: 'Your Name'
            },
            value: '',
            validationParam:{
                required: true,
                minLength: 10,
                maxLength: 30,
                specialCharactersNotAllowed: true
            },
            valid: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type:'email',
                placeholder: 'Your Email'
            },
            value: '',
            validationParam:{
                required: true,
                emailValidation: true
            },
            valid: false

        },
            street: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: 'Your Street',
                    additionaltype: 'address'
                },
                value: '',
                validationParam:{
                    required: true
                },
                valid: false

            },
            postal: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: 'Your PinCode',
                    additionaltype: 'address'
                },
                value: '',
                validationParam:{
                    required: true,
                    NumbersAloneAllowed: true,
                    maxLength: 6
                },
                valid: false

            },
        deliveryType: {
            elementType: 'dropdown',
            elementConfig: {
            options: [{
                value:'fastest',
                 displayValue:'Fastest'
                },
                {
                    value:'normal',
                    displayValue: 'Normal'
                },
        ]
            },
            value: '',
            valid: true
                        
        }
    })

    const orderHandler = (event) =>{
        event.preventDefault();
        //  setState({loading: true})

        let formData = {}
        formData['address'] ={}

        for( let field in orderForm){
            if(orderForm[field].valid){
                if(orderForm[field].elementConfig.additionaltype ==='address'){
                    formData['address'][field] = orderForm[field].value 
                }else{
                    formData[field] = orderForm[field].value
                }
            }else{
                setFormError('Form is not complete')
                return 

        }
        }
        setFormError(null)
        setDisplayAuthMessage(true)
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderedData: formData
        }

        if(props.token){
            props.onSubmitContactData(order,props.token.payload.idToken)
            props.onInitPurchase()
        }
        // else{
        //     props.history.push('/auth')
        // }
        // axios.post('/orders.json',order)
        // .then(res=>{
        //     setState({loading: false,formTouched: false })
        //     props.history.push('/')
        // }
            
        //     )
        // .catch(formError=> setState({loading: false, formTouched: false    }));
    
}

    const checkRule = (key, rules, val) =>{
        let valid = false
        let failedMessage = []
        for( let rule in rules){
            switch(rule){
                case 'required':
                    valid = val.length > 0 ? true : failedMessage.push('Field Required')
                    break;                  
                case 'minLength':
                    valid = String(val).length > rules[rule] ? true : failedMessage.push('Min Length is '+rules[rule])
                    break;                    
                case 'maxLength':
                    valid = String(val).length <= rules[rule] ? true : failedMessage.push('Max Length is '+rules[rule])
                    break;        
                case 'specialCharactersNotAllowed':
                    valid = /^[A-Za-z\s.()]+$/g.test(val)  ? true : val.length > 0 ? failedMessage.push('Only alphabets allowed') : false;
                    break;
                case 'NumbersAloneAllowed':
                    valid = /^[0-9]+$/g.test(val)  ? true : val.length > 0 ? failedMessage.push('Only Numbers allowed') : false;
                    break;
    
                case 'emailValidation':
                    valid = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/g.test(val)  ? true : val.length > 0 ? failedMessage.push('Not a valid email address') : false;
                    break;
                default:
                    return false   
            }
        }
        if(failedMessage.length > 0){
            return failedMessage;
        }
        if(valid){
            setFormError(null)
            setOverallValidity(true)
        }else{
            setFormError('Form is not complete')
        }
        return valid;
    }

    // checkValidity = (key, rule, val) =>{
    //     let valid = false
    //     switch(key){
    //         case 'name':
    //             valid = checkField(rule,val)
    //             break;
    //         default:
    //             return valid
    //     }
    //     return valid
    // }

    const captureValues = (key, value) =>{
        const copyState = {...orderForm};
        copyState[key].value = value;
        if(Object.keys(copyState[key]).includes('valid')){
            let validity = checkRule(key, copyState[key].validationParam, value); 
            copyState[key]['valid'] = validity.length > 0 ? false : true;
            copyState[key]['failedMessage'] = validity.length > 0 ? validity : null;
        }
        setOrderForm(copyState)
        setFormTouched(true)
    }
    

        let formArray = [];
        for (let key in orderForm){

            formArray.push(
            <Input key={key} 
                identifier={key}
                elementType={orderForm[key].elementType} 
                elementConfig={orderForm[key].elementConfig}
                 value={orderForm[key].value}
                 change={(event)=>{
                    event.preventDefault();
                    captureValues(key, event.target.value);
                }} 
                formTouched = {formTouched}
                valid={orderForm[key].valid}
                failedMessage={orderForm[key].failedMessage}/>
                )

        }

        let form = (
            <form>
                {formArray}
                {formError || props.error ? <Aux><p className={classes.formError}>{formError}</p>
                <p className={classes.formError}>{props.error}</p></Aux> : null}
                {!props.token && displayAuthMessage ?<p>Please sign in to proceed with the order</p>:null}
                        <div className={classes.Button} >
            <Button btnType={overallValidity?"Success":"Danger"} clicked={orderHandler}>
                ORDER NOW
            </Button>

            </div>

        </form>

        );

        if(props.loading){
            form = (<Spinner />);
        }
        let content =             <div className={classes.ContactData}>
        <h3 className={classes.Header}>Enter Contact Details</h3>
        {form}
    </div>;
        if(props.purchased){
            return <Redirect to = "/" />
        }
        return content;
    

}

const mapStateToProps = state =>{
    return {
        ingredients: state.ings.ingredients,
        price: state.ings.totalPrice,
        orders: state.cD.orders,
        error: state.cD.error,
        loading: state.cD.loading,
        purchased: state.cD.purchasing,
        token: state.auth.authenticatedData
    }
}


const dispatchActions = dispatch =>{
    return {
        onSubmitContactData: (orderData, token) => dispatch(purchaseInitiate(orderData, token)),
        onInitPurchase: () => dispatch(initIngredients())
    }
}

export default connect(mapStateToProps, dispatchActions)(withErrorHandler(ContactData,axios));