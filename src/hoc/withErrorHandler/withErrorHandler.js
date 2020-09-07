import React from 'react';
import Aux from '../Auxilary';
import Modal from '../../components/UI/Modal/Modal';
import useHttpClient from './hooks/customHook';

const withErrorHandler = (WrappedComponent, axios) =>{
    return props=>{
            const { error, errorHandler } = useHttpClient(axios)
            return(
                <Aux>
                    <Modal show={error} clicked={errorHandler}>
                        {error?error.message:null}
                    </Modal>
                    <WrappedComponent {...props}/>
                </Aux>
            )
        }
}

export default withErrorHandler;