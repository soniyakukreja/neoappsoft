import {Component} from "react"
import { signupThunk } from '../reduxstore/thunk'
import { connect } from 'react-redux'
class Signup extends Component
{
	constructor()
	{
		super()
		this.state={
			onlineUsers:0,
            allerrors:null
		}
	}
    user = {};
    
    getName=(event)=>
    {  
        let name = event.target.value.trim()
        if(name.length>0){
            this.user.name = name
        }
    }

    getEmail=(event)=>
    {
    	this.user.email = event.target.value
    }
    getPassword=(event)=>
    {
    	this.user.password = event.target.value
    }

    validate = (elements)=>{
        var allerrors = {}

        const name = elements.name.value.trim()
        const email = elements.email.value.trim()
        const password = elements.password.value.trim()
        const reg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;		


        if(!name){
            allerrors.name = "Please enter name"
        }
        
        if(!email){
            allerrors.email = "Please enter valid email "
        } else if(!reg.test(email)){
            allerrors.email = "Please enter valid email "
        }

        if(!password){
            allerrors.password = "Please enter password "
        }

        return allerrors
    }

    register = (e)=>{
        e.preventDefault()
        this.setState({ allerrors:null })

        var form =  document.getElementById("signupform")
        var errors = this.validate(form.elements);
        if(Object.keys(errors).length>0){
            this.setState({ allerrors:errors })
        }else{
            this.props.dispatch(signupThunk(this.user))
        }
    }
    
	// goOnline=()=>{
	// 	this.setState({
	// 		onlineUsers:this.state.onlineUsers+1
	// 	})
	// }

	render()
	{
        return(
			<form id="signupform" style={{width:"50%" , margin:"auto"}} className="col-md-6">
              <h2> Signup Section </h2>
                <div className="form-group">
                    <label>Name</label>
                <input type="text" name="name" className="form-control" onChange={this.getName}></input>
               {this.state.allerrors?.name && <div className="text-center text-danger">{this.state.allerrors.name}</div>}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={this.getEmail}></input>
                {this.state.allerrors?.email && <div className="text-center text-danger">{this.state.allerrors.email}</div> }
                </div>

                <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" className="form-control" onChange={this.getPassword}></input>
                {this.state.allerrors?.password && <div className="text-center text-danger">{this.state.allerrors.password}</div> }

                </div>

                <div style={{color:"red"}}>
                    {this.state.errorMessage}
                </div>
              <button className="btn text-light form-control" style={{backgroundColor:"#043d76"}} onClick={this.register}>Register</button>
            </form>
		)
	}
}

export default connect()(Signup);
