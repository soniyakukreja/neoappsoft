import {useState,useEffect} from "react"
import axios from "axios"
import {connect} from "react-redux"

var ForgotPass = function(){
    var uemail = '';
    var [formErrors,setFormErrors] = useState({})
    var [uemail,setUeamail] = ''

    const getEmail = (e)=>{
        //setUeamail(e.target.value)
        uemail = e.target.value
    }

    const forgotpass = ()=>{

        axios({
              url:"https://apibyashu.herokuapp.com/api/recoverpassword",
              method:"post",
              data:{email:uemail}
        }).then((response)=>{
            if(response.data.message){
                alert(response.data.message)
            }
            if(response.data.errorMessage){
                alert(response.data.errorMessage)
            }
            
            console.log('response',response)
           
        },(error)=>{
        //   setErrorMessage("Error from Login api "+error) 
        //   setSuccessMessage("") 
        })
     
    }

    return(
        <div style={{width:"50%" , margin:"auto"}} className="col-md-6">
        <h2 style={{color:"red"}}> Find Your Account</h2>
        <p>Please enter your email address to search for your account.</p>
        <form method="post">
            <input className="form-control" onChange={getEmail} type="email" id="email" placeholder="Email Address" name="email" />
            <br/>
            <button onClick={forgotpass} type="button" className="btn btn-success">Send</button>
        </form>
        </div>
    )
}

export default connect(function(state,props){
return{}
})(ForgotPass)