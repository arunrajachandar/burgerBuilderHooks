import React from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import Aux from '../../hoc/Auxilary';
import ContactData from './ContactData/ContactData';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Checkout extends React.Component{
    // state = {
    //     ingredients: null,
    //     price: 0
    // }
    // componentWillMount(){

    //     const queryParams= new URLSearchParams(this.props.location.search);
    //     const ingredients = {}
    //     let price = 0;
    //     for( let query of queryParams.entries()){
    //         if(query[0]==='price'){
    //             price = +query[1]   
    //         }else{
    //             if(+query[1]>0){
    //                 ingredients[query[0]]=+query[1]
    //             }
    //         }
    //     }
    //     console.log(ingredients)
    //     this.setState({ingredients: ingredients, price: price})
    // }
    cancel = () =>{
        this.props.history.goBack()
    }
    continue = (event)=>{
        this.props.history.replace(this.props.match.url+'/contact-data')
    }
    render(){
        let summary = <Redirect to="/"/>
        if(this.props.ingredients){
            summary=           <Aux>
            <CheckOutSummary ingredients={this.props.ingredients}
            cancel={this.cancel}
            continue={this.continue}/>
            <Route path={this.props.match.path+"/contact-data"} component={ContactData}
            />
        </Aux>
         }
        return summary
    }
}
const mapStateToProps = state =>{

    return {
        ingredients: state.ings.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);