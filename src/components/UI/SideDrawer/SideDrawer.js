import React from 'react';

import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import BackDrop from '../BackDrop/BackDrop';
import Aux from '../../../hoc/Auxilary';

const sideDrawer = (props)=>{
    let attachedClasses = [classes.SideDrawer, classes.Open];
    if(!props.open){
        attachedClasses = [classes.SideDrawer, classes.Close];
    }
    return (
        <Aux>
            <BackDrop show={props.open} hideSummary={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}>
            <Logo />
            </div>
            <nav>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </div>

        </Aux>
    )
}


export default sideDrawer;