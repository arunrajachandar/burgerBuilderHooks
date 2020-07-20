import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import DrawerTogger from '../SideDrawer/DrawerToggler/DrawerToggler';
const toolbar = (props)=>(
        <header className={classes.Toolbar}>
            <div className={classes.Menu}>
                <DrawerTogger clicked={props.show}/>
            </div>
            <Logo />
            <nav className={classes.NavItems}>
                <NavigationItems isAuth={props.isAuth}/>                
            </nav>
        </header>
)

export default toolbar;