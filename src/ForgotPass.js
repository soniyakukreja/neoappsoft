import {useState,useEffect} from "react"
import axios from "axios"
import {connect} from "react-redux"

var ForgotPass = function(){
    var uemail = '';
    var [formErrors,setfErrors] = useState()

    const getEmail = (e)=>{
        uemail = e.target.value
    }
    let isValid = true;
    var validate = ()=>{
        var reg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;		

        if ( uemail.trim() == '' ){
            setfErrors("Email is required")
            isValid= false
        }else if(reg.test(uemail) == false){
            setfErrors("Provide a valid Email Address")
            isValid= false
        }else{
            setfErrors("")
        }

    } 

    const forgotpass = ()=>{
       validate()
        console.log('validate',isValid)
        if(isValid){

            axios({
                url:"https://apibyashu.herokuapp.com/api/recoverpassword",
                method:"post",
                data:{email:uemail}
            }).then((response)=>{
                if(response.data.message){
                    alert(response.data.message)
                    document.getElementById('email').value = ''
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
    }

    return(
        <div style={{width:"50%" , margin:"auto"}} className="col-md-6">
        <h2 style={{color:"red"}}> Find Your Account</h2>
        <p>Please enter your email address to search for your account.</p>
        <form method="post">
            <input className="form-control" onChange={getEmail} type="email" id="email" placeholder="Email Address" name="email" />
            <div className="text-bold text-danger ">{formErrors?formErrors:''}</div>
            <br/>
            <button onClick={forgotpass} type="button" className="btn btn-success">Send</button>
        </form>
        </div>
    )
}

export default connect(function(state,props){
return{}
})(ForgotPass)