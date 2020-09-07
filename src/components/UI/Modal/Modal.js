import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxilary';
import BackDrop from '../BackDrop/BackDrop';

const modal = props =>{
    // shouldComponentUpdate(nextState, nextProps){
    //     console.log(nextState, this.props)
    //     return nextState.show !== props.show || nextState.children!==props.children;
    // }


 return(   <Aux>
       <BackDrop show={props.show} hideSummary={props.clicked}/>
    <div className={classes.Modal}
    style={{
        transform: props.show ? 'translateY(0)': 'translate(-100vh)',
        opacity: props.show ? '1':'0'
    }}>
        
        {props.children}
    </div>
   </Aux>

)
};

export default React.memo(modal,(prevProps, nextProps)=>{
    return prevProps.show === nextProps.show && prevProps.children===nextProps.children;
});