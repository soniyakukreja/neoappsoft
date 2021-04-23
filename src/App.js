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
import ForgotPass from './ForgotPass'
import axios from "axios"
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';


function App(props) {
console.log('app props',props)
// console.log('currenturl',window.location.href)
var [user_cart,setUser_cart]=useState()
var [usertoken,setUsertoken]=useState()

useEffect(()=>{

  if(localStorage.token && !props.user){
    
    var token = localStorage.token 
    axios({
        url:'https://apibyashu.herokuapp.com/api/getuserdetails',
        method:"get",
        headers : {
          authtoken: token
      }
    }).then((response)=>{
         props.dispatch({
          type:"INITIALIZE_USER",
          payload:response.data.data
      })
      setUsertoken(response.data.token)

    }, (error)=>{
        console.log("response from get user details api : ",error)
    })
  }
  

    if(localStorage.token){
      axios({
          url:"https://apibyashu.herokuapp.com/api/cakecart",
          method:"post",
          data: {},
          headers : {
              authtoken: localStorage.token
          }
      }).then((response)=>{
          props.dispatch({
            type:"CART_DATA",
            payload:response.data.data
        })
        setUser_cart(response.data.token)
      }, (error)=>{
          console.log("user get cart api error : ",error)
      })
    }
  },[props.token])


  return (
   <div>
     <Router>
       <Navbar/>
       <div>
       <Switch>
           <Route path="/" exact component={Home} />
           <Route path="/search" exact component={Search} />  
           <Route path="/cake/:cakeid" exact component={Cakedetails} />
           

           <Route path="/login"  exact  ><Login /></Route>
           <Route path="/signup" exact component={Signup} />
           <Route path="/forgotpass" exact component={ForgotPass} />
           {/* <Route path="/checkout"  component={Checkout} />
           <Route path="/cart" exact component={Cart} />
           */}
           {localStorage.token ?
           <>
           
           <Route path="/checkout" exact  component={Checkout} />
           <Route path="/cart" exact component={Cart} />
           </>:''  
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
 return{
     user:state?.user ,
     token:state?.user?.token
  }
})(App);