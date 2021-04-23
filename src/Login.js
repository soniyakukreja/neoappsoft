import {useState,useEffect} from "react"
import axios from "axios"
import { Link ,withRouter } from "react-router-dom"
import { connect } from "react-redux"



function Login(props)
{

  var [formErrors,setFormErrors] = useState({})
  var [errorMessage,setErrorMessage]=useState()
  var [successMessage,setSuccessMessage]=useState()

  var [user,setUser]=useState({})

    let getEmail=(event)=>
    {
        setUser({
            ...user,
            email:event.target.value,
        })
    }
    let getPassword=(event)=>
    {
        setUser({
            ...user,
            password:event.target.value,
        })
    }

    var validate = function (elm){
      var errors= {}
      if(!elm.email.value){
          
        errors.email= "Email is Required"
      }

      if(!elm.password.value){
          errors.password= "Password is Required"
      }     
      
      var errorkeys = Object.keys(errors)
      if(errorkeys.length>0)
      <>
      setFormErrors(errors)
      return errors
      </>
      else
      return false
  }

    let login = (e)=>{
      e.preventDefault()
      var form = document.getElementById('login')
        var errors = validate(form.elements)
        
        if(errors){
          console.log('errors',errors)
            setFormErrors(errors)
            console.log('ferrors',formErrors)
        }else{

          if(user.email && user.password){
              
          let apiurl="https://apibyashu.herokuapp.com/api/login"
            axios({
                  url:apiurl,
                  method:"post",
                  data:user
            }).then((response)=>{
                if(response.data.token)
                {
                  localStorage.token = response.data.token
                  setErrorMessage("")
                  setSuccessMessage("Logged In Successfully")

                  props.dispatch({
                    type:"LOGIN",
                    payload:response.data
                  })
                  props.history.push("/")
                }else
                {
                  setErrorMessage("Invalid credentials")
                  setSuccessMessage("")
                }
            },(error)=>{
              setErrorMessage("Error from Login api "+error) 
              setSuccessMessage("") 
            })
          }
          else{
            setErrorMessage("Validation Failed")
            setSuccessMessage("")
          }
      }
    }

		return(
            
			<div style={{width:"50%" , margin:"auto"}} className="col-md-6">
              <h2> Login Here ! </h2>
              <form id="login">
                <div className="form-group">
                    <label>Email</label>
                <input type="email" id="email" className="form-control" onChange={getEmail}></input>
                   {/* { user?.email && <label>{user.email}</label> } */}
                   {formErrors?.name && <div className="form-error"> <div>{formErrors.name}</div></div>}
                </div>
                <div className="form-group">
                <label>Password</label>
                <input type="password" id="password" className="form-control" onChange={getPassword}></input>
                   {/* {user?.password && <label>{user.password}</label> } */}
                </div>
                <div style={{color:"red"}}  className="text-center">
                    {errorMessage}
                </div>
                {successMessage?
                <div style={{color:"green"}} className="text-center">
                    {successMessage}
                </div>:''}
                <button className="btn btn-success form-control text-center my-2"  onClick={login}>Login</button>
                </form>
                <div style={{float:'right'}}>
                  <Link to="/forgotpass">Forgot password</Link>
                </div>
                <div>
                  <Link to="/signup">New User? Click Here</Link>
                </div>
            </div>
		)
	
}

Login = withRouter(Login)

export default connect()(Login);