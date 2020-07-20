import React from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../UI/Toolbar/Toolbar';
import SideDrawer from '../UI/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends React.Component{
    state ={
        SideDrawer: false
    }
    showSideDrawer = () =>{
        this.setState((prevState) => {
          return  {SideDrawer: !prevState.SideDrawer};
        }
    )
    }
     render(){
        return(
            <Aux>
            <Toolbar show={this.showSideDrawer} isAuth ={this.props.isAuth? this.props.isAuth.payload.idToken != null:false}/>
            <SideDrawer open={this.state.SideDrawer} closed={this.showSideDrawer} isAuth ={this.props.isAuth?this.props.isAuth.payload.idToken != null:false}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>    
        );    
     }

} 

const mapStateToProps = state =>{
    return{
        isAuth: state.auth.authenticatedData
    }
}


export default connect(mapStateToProps)(Layout);