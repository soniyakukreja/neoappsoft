import React, { useEffect, Suspense } from "react"
import './assets/App.css';
import Home from './components/Home'
import Navbar from './template/Navbar'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import Search from './components/Search'
import Pagenotfound from './Pagenotfound'
import Cakedetails from './components/Cakedetails'
import Cart from './components/Cart'
import Checkout from './components/checkout/Checkout'
import ForgotPass from './Auth/ForgotPass'
import Myorders from './components/Myorders'
import Footer from './template/Footer'
import Highorder from './Highorder'
import Highorderr from './Highorderr'
import context_Api from './context_Api'
import ErrorBoundary from './footer_pages/ErrorBoundary'
//import class_context_Api from './class_context_Api'
//import Demo from './Demo'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Fragment } from "react";
var SuspendedAdmin = React.lazy(() => import('./footer_pages/Admin'))

function App(props) {
  useEffect(() => {
    if (localStorage.token) {
      props.dispatch({
        type: "USER_INIT",
      })
    }
  }, [props.token])


  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={Search} />
          <Route path="/cake/:cakeid" exact component={Cakedetails} />
          <Route path="/login" exact  ><Login /></Route>
          <Route path="/signup" exact component={Signup} />
          <Route path="/forgotpass" exact component={ForgotPass} />
          <Route path="/hoc" exact component={Highorder} />
          <Route path="/functional-hoc" exact component={Highorderr} />
          <Route path="/context-hoc" exact component={context_Api} />
          {/* <Route path="/class_context_Api" exact component={class_context_Api} />  */}
          {/* <Route path="/demo" exact component={Demo} /> */}
          <Route path="/admin" exact >
            <Suspense fallback={<div>Loadin...</div>}>
              <SuspendedAdmin />
            </Suspense>
          </Route>

          {localStorage?.token && <Route path="/checkout" component={Checkout} />}
          {localStorage?.token && <Route path="/myorders" exact component={Myorders} />}
          {localStorage?.token && <Route path="/cart" exact component={Cart} />}
          {/* 
          {localStorage?.token && <Fragment>
            <Route path="/checkout" component={Checkout} />
            <Route path="/myorders" exact component={Myorders} />
            <Route path="/cart" exact component={Cart} />
            </Fragment>} */}
          {/* <Route path="/*" exact component={Pagenotfound} />  */}

          <Route path="/*">
            <Redirect to="/" />
          </Route>
        </Switch>
        {/* <Footer />  */}

      </Router>
    </ErrorBoundary>
  );
}

export default connect(function (state, props) {
  // console.log("==============app connect=================== ")
  // console.log("==============app state", state)

  return {
    user: state?.user,
    token: state?.user?.token
  }
})(App);