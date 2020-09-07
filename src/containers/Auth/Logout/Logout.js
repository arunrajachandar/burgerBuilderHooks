import React, { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../../../store/auth/authActionCreators';

const Logout = props =>{
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(actionCreators.logoutInitiate())
    },[dispatch])

        return <Redirect to="/" />
}

// const mapDispatchToProps = dispatch =>{
//     return{
//         onLogout: ()=> dispatch(actionCreators.logoutInitiate())
//     }
// }


export default (Logout);