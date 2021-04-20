import {useState,useEffect} from "react"
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
import axios from "axios"
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';


function App(props) {

  if(localStorage.token && !props.user){
    var token = localStorage.token 
    axios({
      url:'https://apibyashu.herokuapp.com/api/getuserdetails',
      method:'get',
      headers:{
        authtoken:token
      }
    }).then((response)=>{
      props.dispatch({
        type:"INITIALIZE_USER",
        payload:response.data.data
      })


    },(error)=>{

    })
  }


/*
  if(localStorage.token && props.user && !props.user_cart){
    alert("if user obj found")
    let getCartDetailsAPI = "https://apibyashu.herokuapp.com/api/cakecart"
        let token = localStorage.token
        axios({
            url:getCartDetailsAPI,
            method:"post",
            data: {},
            headers : {
                authtoken: token
            }
        }).then((response)=>{
          props.dispatch({
            type:"CART_DATA",
            payload:response.data.data
          })
             console.log("user cart data : ",response)
             console.log('after props',props)
            // setcartDetails(response.data.data)
        }, (error)=>{
            console.log("error from user cartapi : ",error)
        })
  }
  */
  return (
   <div>
     <Router>
       <Navbar/>
       <div>
       <Switch>
           <Route path="/" exact component={Home} />
           <Route path="/search" exact component={Search} />  
           <Route path="/cake/:cakeid" exact > <Cakedetails /></Route>
           {!props.user ?
           <div>
           <Route path="/login"  exact  ><Login /></Route>
           <Route path="/signup" exact component={Signup} />
           </div>:''
          }
           {props.user ?
           <div>
           <Route path="/checkout"  component={Checkout} />
           <Route path="/cart" exact component={Cart} />
           </div>:''  
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

export default connect(function(state,props){
 return{  user:state?.user }
})(App);