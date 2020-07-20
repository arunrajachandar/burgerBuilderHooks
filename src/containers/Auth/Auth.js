import React from 'react';
import classes from './Auth.module.css';
import Aux from '../../hoc/Auxilary';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actionCreators from '../../store/auth/authActionCreators';
import { purchaseInit } from '../../store/contactData/contactDataActionCreators';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import {connect} from 'react-redux';
// import Spinner from '../../components/UI/Spinner/Spinner';
// import { Redirect } from 'react-router-dom';


class Auth extends React.Component {
    state = {
        signInForm : {
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type:'password',
                    placeholder: 'Password'
                },
                value: '',
                validationParam:{
                    required: true,
                    minLength: 6
                },
                valid: false

            }
        },
        formError: null,
        overallValidity: false,
        formTouched: false,
        isSignup: false
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
                    valid = String(val).length >= rules[rule] ? true : failedMessage.push('Min Length is '+rules[rule])
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


        
        if(failedMessage.length > 0 ){
            return failedMessage;
        }
        
        return valid;
    }

    captureValues = (key, value) =>{
        const copyState = {...this.state.signInForm};
        copyState[key].value = value;
            let validity = this.checkRule(key, copyState[key].validationParam, value); 
            copyState[key]['valid'] = validity.length > 0 ? false : true;
            copyState[key]['failedMessage'] = validity.length > 0 ? validity : null;
            if(this.props.error){
                this.props.clearError();
            }    

            this.setState({
            signInForm: copyState,
            formTouched: true
        })
    }

    overallValidityCheck = () => {
        let validated = false
        let formError = null
        for(let entity in this.state.signInForm){
            if(!this.state.signInForm[entity].valid){
                formError = 'Form is not complete'
            } 
        }

        validated = formError ? false : true;

        this.setState({
            overallValidity: validated,
            formError: formError
        })
    }
    requestToken = (event) =>{
        event.preventDefault();
        
        this.props.onCDPurchaseInit();
        const credentials = {
            email: this.state.signInForm.email.value,
            password: this.state.signInForm.password.value
        }
        this.props.requestToken(credentials, this.state.isSignup)
    }

    authHandler = (event) =>{
        event.preventDefault();
        this.setState(prevState=>({
            isSignup: !prevState.isSignup
        }))
    }

    render(){

        let formArray = [];
        for (let key in this.state.signInForm){

            formArray.push(
            <Input key={key} 
                identifier={key}
                elementType={this.state.signInForm[key].elementType} 
                elementConfig={this.state.signInForm[key].elementConfig}
                 value={this.state.signInForm[key].value}
                 change={(event)=>{
                    event.preventDefault();
                    this.captureValues(key, event.target.value);
                    this.overallValidityCheck();
                }} 
                formTouched = {this.state.formTouched}
                valid={this.state.signInForm[key].valid}
                failedMessage={this.state.signInForm[key].failedMessage}/>
                )

        }

    

        let form = (
            <form>
                {formArray}
                {
                this.state.formError || this.props.error ? 
                <Aux><p className={classes.formError}>
                    {this.state.formError}
                </p>
                <p className={classes.formError}>
                    {this.state.error}</p>
                <p className={classes.formError}>
                    {this.props.error}</p>
                </Aux>
                : null
                
                }
            
                

                <div className = {classes.Button}>
                <Button btnType={this.state.overallValidity?"Success":"Danger"} clicked={this.requestToken} >
            {this.state.isSignup ? "Sign Up" : "Sign In"}
            </Button>
            </div>

            <div className = {classes.Button}>
            <Button btnType="Danger" clicked={this.authHandler}>
                Switch to {this.state.isSignup ? "Sign In" : "Sign Up"}
            </Button>

            
            </div>

        </form>

        );
          
        // if(this.props.loading){
        //  form = <Spinner />
        // }


        // if(this.props.isAuthenticated){
        //     console.log('Auth')
        //     form =  <p>Arun</p>
//            return !this.props.purchaseable ? <Redirect to="/" /> : <Redirect to="/checkout" />
        // }


        return(<div className={classes.Auth}>
            <h3 className={classes.Header}>Welcome to Burger Builder</h3>
            {form}
        </div>)
    }
}

const mapStateToProps = state =>{
    return {
        loading: state.auth.loading,
        purchaseable: state.ings.purchaseable,
        error: state.auth.error,
        isAuthenticated: state.auth.authenticatedData !== null
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        requestToken: (creds, method)=>dispatch(actionCreators.requestForToken(creds, method)),
        clearError: ()=>dispatch(actionCreators.clearError()),
        onCDPurchaseInit: ()=> dispatch(purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));