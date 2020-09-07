import React, {useCallback} from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import Aux from '../../hoc/Auxilary';
import ContactData from './ContactData/ContactData';
import {Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';

const Checkout = (props) => {
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

    const ingredients = useSelector(state=> state.ings.ingredients)
    const cancel = useCallback(() =>{
        props.history.goBack()
    },[])
    const continueButton = useCallback((event)=>{
        props.history.replace(props.match.url+'/contact-data')
    },[props.history, props.match.url])
        let summary = <Redirect to="/"/>
        if(ingredients){
            summary=           <Aux>
            <CheckOutSummary ingredients={ingredients}
            cancel={cancel}
            continue={continueButton}/>
            <Route path={props.match.path+"/contact-data"} component={ContactData}
            />
        </Aux>
         }
        return summary
}
// const mapStateToProps = state =>{

//     return {
//         ingredients: state.ings.ingredients
//     }
// }

export default Checkout;