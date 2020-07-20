import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxilary';
import BackDrop from '../BackDrop/BackDrop';
class Modal extends React.Component{
    shouldComponentUpdate(nextState, nextProps){
        return nextState.show !== this.props.show || nextState.children!==this.props.children;
    }
    render(){

 return(   <Aux>
       <BackDrop show={this.props.show} hideSummary={this.props.clicked}/>
    <div className={classes.Modal}
    style={{
        transform: this.props.show ? 'translateY(0)': 'translate(-100vh)',
        opacity: this.props.show ? '1':'0'
    }}>
        
        {this.props.children}
    </div>
   </Aux>

)
    }
};

export default Modal;