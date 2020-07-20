import React from 'react';
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

class ContactData extends React.Component{
    state={
        formTouched: false,
        overallValidity: false,
        orderForm:{
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
        },
        // loading: false,
        formError: null,
        displayAuthMessage : false
    }
    
    orderHandler = (event) =>{
        event.preventDefault();
        //  this.setState({loading: true})

        let formData = {}
        formData['address'] ={}

        for( let field in this.state.orderForm){
            if(this.state.orderForm[field].valid){
                if(this.state.orderForm[field].elementConfig.additionaltype ==='address'){
                    formData['address'][field] = this.state.orderForm[field].value 
                }else{
                    formData[field] = this.state.orderForm[field].value
                }
            }else{
                this.setState({ formError: 'Form is not complete'});
                return 

        }
        }
        this.setState({formError: null, displayAuthMessage: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderedData: formData
        }

        if(this.props.token){
            this.props.onSubmitContactData(order,this.props.token.payload.idToken)
            this.props.onInitPurchase()
        }
        // else{
        //     this.props.history.push('/auth')
        // }
        // axios.post('/orders.json',order)
        // .then(res=>{
        //     this.setState({loading: false,formTouched: false })
        //     this.props.history.push('/')
        // }
            
        //     )
        // .catch(formError=> this.setState({loading: false, formTouched: false    }));
    
}

    checkRule = (key, rules, val) =>{
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
            this.setState({formError: null, overallValidity: true})
        }else{
            this.setState({formError: 'Form is not complete'})
        }
        return valid;
    }

    // checkValidity = (key, rule, val) =>{
    //     let valid = false
    //     switch(key){
    //         case 'name':
    //             valid = this.checkField(rule,val)
    //             break;
    //         default:
    //             return valid
    //     }
    //     return valid
    // }

    captureValues = (key, value) =>{
        const copyState = {...this.state.orderForm};
        copyState[key].value = value;
        if(Object.keys(copyState[key]).includes('valid')){
            let validity = this.checkRule(key, copyState[key].validationParam, value); 
            copyState[key]['valid'] = validity.length > 0 ? false : true;
            copyState[key]['failedMessage'] = validity.length > 0 ? validity : null;
        }
         this.setState({
            orderForm: copyState,
            formTouched: true
        })
    }
    
    render(){
        let formArray = [];
        for (let key in this.state.orderForm){

            formArray.push(
            <Input key={key} 
                identifier={key}
                elementType={this.state.orderForm[key].elementType} 
                elementConfig={this.state.orderForm[key].elementConfig}
                 value={this.state.orderForm[key].value}
                 change={(event)=>{
                    event.preventDefault();
                    this.captureValues(key, event.target.value);
                }} 
                formTouched = {this.state.formTouched}
                valid={this.state.orderForm[key].valid}
                failedMessage={this.state.orderForm[key].failedMessage}/>
                )

        }

        let form = (
            <form>
                {formArray}
                {this.state.formError || this.props.error ? <Aux><p className={classes.formError}>{this.state.formError}</p>
                <p className={classes.formError}>{this.state.error}</p></Aux> : null}
                {!this.props.token && this.state.displayAuthMessage ?<p>Please sign in to proceed with the order</p>:null}
                        <div className={classes.Button} >
            <Button btnType={this.state.overallValidity?"Success":"Danger"} clicked={this.orderHandler}>
                ORDER NOW
            </Button>

            </div>

        </form>

        );

        if(this.props.loading){
            form = (<Spinner />);
        }
        let content =             <div className={classes.ContactData}>
        <h3 className={classes.Header}>Enter Contact Details</h3>
        {form}
    </div>;
        if(this.props.purchased){
            return <Redirect to = "/" />
        }
        return content;
    }

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