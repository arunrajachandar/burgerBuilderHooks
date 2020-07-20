import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch, Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import {authHandler} from './store/auth/authActionCreators';
import {connect} from 'react-redux';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';

const asyncAuth = AsyncComponent(()=>{
  return import ('./containers/Auth/Auth');
})

const asyncOrders = AsyncComponent(()=>{
  return import ('./containers/Orders/Orders')
})

const asyncCheckout = AsyncComponent(()=>{
  return import ('./containers/Checkout/Checkout')
})

class App extends React.Component {
  componentDidMount(){
    this.props.onAuthHandler()
  }
  render(){
    let routes = (
      <Switch>
      <Route path="/" exact component={BurgerBuilder}/>
      <Route path="/auth" component  = {asyncAuth}/>
      <Redirect to="/"/>
      </Switch>

    )
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
        
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/checkout" component={asyncCheckout}/>
        <Route path="/orders" component={asyncOrders}/>
        <Route path="/logout" component={Logout}/>
        {
            !this.props.purchaseable?
              <Redirect to="/"/>
                      : <Redirect to="/checkout" />
          
        }

        </Switch>

      )
    }
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  
  }
}

const mapStateToProps = state =>{
  return{
    isAuthenticated: state.auth.authenticatedData !== null,
    purchaseable: state.ings.purchaseable
  }
}

const mapDispatchtoProps = dispatch =>{
  return {
    onAuthHandler: ()=>dispatch(authHandler())
  }
}

export default connect(mapStateToProps,mapDispatchtoProps)(App);
