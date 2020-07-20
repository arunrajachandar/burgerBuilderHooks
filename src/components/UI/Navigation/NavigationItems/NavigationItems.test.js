import React from 'react';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
import {configure, shallow, setProps   } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()})

describe('<NavigationItems>',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />)
    })
    it('<NavigationItem> should return 2 if not authenticated',()=>{
        console.log(wrapper)
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })
    it('<NavigationItem> should return 3 if authenticated',()=>{
        wrapper.setProps({isAuth: true})
        expect(wrapper.contains(<NavigationItem link="/logout" >Log Out</NavigationItem>)).toEqual(true)
    })

})