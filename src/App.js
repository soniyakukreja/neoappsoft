import { useState, useEffect } from "react"
import logo from './logo.svg';
import './App.css';
import Home from './Home'
import Navbar from './Navbar'
import Carousel from './Carousel'
import Signup from './Signup'
import Login from './Login'
import Search from './Search'
import Pagenotfound from './Pagenotfound'
import Cakedetails from './Cakedetails'
import Cart from './Cart'
import Checkout from './Checkout'
import Check from './Check'
import ForgotPass from './ForgotPass'
import Myorders from './Myorders'
import Footer from './Footer'
//import Allproducts from './thunk/Allproducts'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';


function App(props) {
  var [user_cart, setUser_cart] = useState()
  var [usertoken, setUsertoken] = useState()


  useEffect(() => {
   // console.log('app useeffect')
    if (localStorage.token) {

   //   console.log('app before dispatch')
      props.dispatch({
        type: "USER_INIT",
      })
    }
    //  if (localStorage.token && !props.user) {
      // var token = localStorage.token
      // axios({
      //   url: 'https://apibyashu.herokuapp.com/api/getuserdetails',
      //   method: "get",
      //   headers: {
      //     authtoken: token
      //   }
      // }).then((response) => {
      //   props.dispatch({
      //     type: "INITIALIZE_USER",
      //     payload: response.data.data
      //   })
      //   setUsertoken(response.data.token)

      // }, (error) => {
      //   console.log("response from get user details api : ", error)
      // })
   // }


    // if (localStorage.token) {
    //   axios({
    //     url: "https://apibyashu.herokuapp.com/api/cakecart",
    //     method: "post",
    //     data: {},
    //     headers: {
    //       authtoken: localStorage.token
    //     }
    //   }).then((response) => {

    //    // console.log("app cakecart response : ", response)

    //     props.dispatch({
    //       type: "CART_DATA",
    //       payload: response.data.data
    //     })
    //     setUser_cart(response.data.token)
    //   }, (error) => {
    //     console.log("user get cart api error : ", error)
    //   })
    // }

  }, [props.token])


  return (
    <div>
      <Router>
        <Navbar />
        <Footer />
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" exact component={Search} />

            <Route path="/cake/:cakeid" exact component={Cakedetails} />


            <Route path="/login" exact  ><Login /></Route>
            <Route path="/signup" exact component={Signup} />
            <Route path="/forgotpass" exact component={ForgotPass} />
            {/* <Route path="/check"   component={Check} /> */}
            {/* <Route path="/checkout"  component={Checkout} />
           <Route path="/cart" exact component={Cart} />
           */}
            {localStorage.token ?
              <>

                <Route path="/checkout" component={Checkout} />
                <Route path="/myorders" component={Myorders} />
                <Route path="/cart" exact component={Cart} />
              </> : ''
            }
            {/* <Route path="/*" exact component={Pagenotfound} /> */}

            <Route path="/*">
              <Redirect to="/"></Redirect>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
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