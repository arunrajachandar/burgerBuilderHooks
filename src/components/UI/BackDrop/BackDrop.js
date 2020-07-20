import React from 'react';
import classes from './BackDrop.module.css';

const backDrop = (props)=>(
    
         props.show ?
        <div className={classes.BackDrop} onClick={props.hideSummary}>

        </div>:
        null
        
    
)

export default backDrop;