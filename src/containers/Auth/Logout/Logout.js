import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../../../store/auth/authActionCreators';

class Logout extends React.Component{

    componentDidMount(){
        this.props.onLogout();
        this.props.onRemoveData();
    }

    render(){
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onLogout: ()=> dispatch(actionCreators.authLogout()),
        onRemoveData: () => dispatch(actionCreators.logout())
    }
}


export default connect(null,mapDispatchToProps)(Logout);