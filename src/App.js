import React, {useEffect, Suspense} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch, Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import {authHandler} from './store/auth/authActionCreators';
import { useSelector, useDispatch} from 'react-redux';
// import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';

const Auth = React.lazy(()=>{
  return import ('./containers/Auth/Auth');
})

const Orders = React.lazy(()=>{
  return import ('./containers/Orders/Orders')
})

const Checkout = React.lazy(()=>{
  return import ('./containers/Checkout/Checkout')
})

const App = (props) => {
  const isAuthenticated = useSelector(state=>state.auth.authenticatedData !== null)
  const purchaseable = useSelector(state=> state.ings.purchaseable)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(authHandler())
  },[dispatch])

    let routes = (
      <Switch>
      <Route path="/" exact component={BurgerBuilder}/>
      <Route path="/auth" render  = {(props)=> <Auth {...props}/>}/>
      <Redirect to="/"/>
      </Switch>

    )
    if(isAuthenticated){
      routes = (
        <Switch>
        
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/checkout" render={(props)=><Checkout {...props}/>}/>
        <Route path="/orders" render={(props)=><Orders {...props}/>}/>
        <Route path="/logout" component={Logout}/>
        {
            !purchaseable?
              <Redirect to="/"/>
                      : <Redirect to="/checkout" />
          
        }

        </Switch>

      )
    }
    return (
      <div className="App">
        <Layout>
          <Suspense fallback={<p>Loading....</p>}>
          {routes}
          </Suspense>
        </Layout>
      </div>
    );
  

}

// const mapStateToProps = state =>{
//   return{
//     isAuthenticated: state.auth.authenticatedData !== null,
//     purchaseable: state.ings.purchaseable
//   }
// }

// const mapDispatchtoProps = dispatch =>{
//   return {
//     onAuthHandler: ()=>dispatch(authHandler())
//   }
// }

export default App;
