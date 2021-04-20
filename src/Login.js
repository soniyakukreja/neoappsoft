import {useState,useEffect} from "react"
import axios from "axios"
import { Link ,withRouter } from "react-router-dom"
import { connect } from "react-redux"



function Login(props)
{

    useEffect(()=>{
       
    },[])
	
    var [errorMessage,setErrorMessage]=useState()

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

    let login = ()=>{
        if(user.email && user.password){
            setErrorMessage("Login Successfully")
        
        let apiurl="https://apibyashu.herokuapp.com/api/login"
           axios({
                url:apiurl,
                method:"post",
                data:user
           }).then((response)=>{
              if(response.data.token)
              {
                localStorage.token = response.data.token
                //localStorage.email = response.data.email

                props.dispatch({
                  type:"LOGIN",
                  payload:response.data
                })
                //alert('a')
                props.history.push("/")
                setErrorMessage("Login Successfully")
              }else
              {
                setErrorMessage("Invalid credentials")
              }
           },(error)=>{
            setErrorMessage("Error from Login api "+error)  
           })
        }
        else{
           setErrorMessage("Invalid Login")
        }
    }
	
		return(
            
			<div style={{width:"50%" , margin:"auto"}} className="col-md-6">
              <h2> Login Section </h2>
                <div className="form-group">
                    <label>Email</label>
                <input type="email" className="form-control" onChange={getEmail}></input>
                   { user && <label>{user.email}</label> }
                </div>
                <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" onChange={getPassword}></input>
                   {user && <label>{user.password}</label> }
                </div>
                <div style={{color:"red"}}>
                    {errorMessage}
                </div>
                <div style={{float:'right'}}>
                  <Link to="/forgot">Forgot password</Link>
                </div>
                <div>
                  <Link to="/signup">New User? Click Here</Link>
                </div>
              <button className="btn btn-primary" onClick={login}>Login</button>
            </div>
		)
	
}

Login = withRouter(Login)

export default connect()(Login);