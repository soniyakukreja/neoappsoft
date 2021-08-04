import {useState} from "react"
import {connect} from "react-redux"
import { ForgotPassThunk } from "../reduxstore/thunk";

var ForgotPass = function(props){
    var uemail = '';
    var [formErrors,setfErrors] = useState()

    const getEmail = (e)=>{
        uemail = e.target.value
    }
    let isValid = true;
    var validate = ()=>{
        var reg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;		

        if ( uemail.trim() === '' ){
            setfErrors("Email is required")
            isValid= false
        }else if(reg.test(uemail) === false){
            setfErrors("Provide a valid Email Address")
            isValid= false
        }else{
            setfErrors("")
        }

    } 

    const forgotpass = ()=>{
       validate()
        if(isValid){

            props.dispatch(ForgotPassThunk({email:uemail}))
            //props.dispatch(abc({}))
        }
    }

    return(
        <div style={{width:"50%"}} className="container col-md-6 mt-3 mb-3">
        <h2 style={{color:"red"}}> Find Your Account</h2>
        <p>Please enter your email address to search for your account.</p>
        <form method="post">
            <input className="form-control" onChange={getEmail} type="email" id="email" placeholder="Email Address" name="email" />
            {formErrors && <div className="text-bold text-danger ">{formErrors}</div>}
            <br/>
            { props?.reset_mail_sent && <div className="text-bold text-danger ">{props.reset_mail_sent}</div> }
            <button  className="btn text-light form-control text-center my-2"style={{backgroundColor:"#043d76"}} onClick={forgotpass} type="button" >Send</button>
        </form>
        </div>
    )
}

export default connect(function(state,props){

return{
    hello:state?.hello,
    reset_mail_sent:state?.reset_mail_sent
}
})(ForgotPass)