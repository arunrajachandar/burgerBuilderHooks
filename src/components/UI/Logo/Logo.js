import React from 'react';
import backLogo from '../../../assets/Logo/Logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} >
        <img src={backLogo} alt="My Burger"/>
    </div>
)

export default logo;