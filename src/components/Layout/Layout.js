import React, {useReducer} from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../UI/Toolbar/Toolbar';
import SideDrawer from '../UI/SideDrawer/SideDrawer';
import {connect } from 'react-redux';

const toggleSideDrawer = (state, action) =>{
    switch(action.type){
        case 'TOGGLE':
            return {...state, SideDrawer: !state.SideDrawer}
        default:
            return state
    }
}

const Layout= (props) =>{
    const [toggleState, toggleFunc] = useReducer(toggleSideDrawer,{
        SideDrawer: false
    })

        return(
            <Aux>
            <Toolbar show={()=>toggleFunc({type:'TOGGLE'})} isAuth ={props.isAuth? props.isAuth.payload.idToken != null : false}/>
            <SideDrawer open={toggleState.SideDrawer} closed={()=>toggleFunc({type:'TOGGLE'})} isAuth ={props.isAuth? props.isAuth.payload.idToken != null:false}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>    
        );    
     

} 

const mapStateToProps = state =>{
    return{
        isAuth: state.auth.authenticatedData
    }
}


export default connect(mapStateToProps)(Layout);