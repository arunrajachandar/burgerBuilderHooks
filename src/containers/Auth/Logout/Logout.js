import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../../../store/auth/authActionCreators';

class Logout extends React.Component{

    componentDidMount(){
        this.props.onLogout();
    }

    render(){
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onLogout: ()=> dispatch(actionCreators.logoutInitiate())
    }
}


export default connect(null,mapDispatchToProps)(Logout);