import {Component} from "react"
import axios from "axios"
class Signup extends Component
{
	constructor()
	{
		super()
		this.state={
			onlineUsers:0
		}
	}
  componentDidMount()
  {
    //this.testfunction()
  }


    user = {}
    
    getName=(event)=>
    {
        this.user.name = event.target.value
    }

    getEmail=(event)=>
    {
    	this.user.email = event.target.value
    }
    getPassword=(event)=>
    {
    	this.user.password = event.target.value
    }

    register = ()=>{
        if(!this.user.email || !this.user.password || !this.user.name){
            this.setState({
                errorMessage:"Please Fill Details"
            })
        }
        else{
           this.setState({
               errorMessage:null
           })
           let apiurl="https://apibyashu.herokuapp.com/api/register"
           axios({
                url:apiurl,
                method:"post",
                data:this.user
           }).then((response)=>{
              console.log("Response from signup api",response.data)
           },(error)=>{
              console.log("Error from signup api",error)  
           })
        }
         console.log("...... user details" , this.user)
       
    }
    
	goOnline=()=>{
		console.log("......",this)
		this.setState({
			onlineUsers:this.state.onlineUsers+1
		})
	}

	render()
	{
		return(
	

			<div style={{width:"50%" , margin:"auto"}} className="col-md-6">
              <h2> Signup Section </h2>
                <div className="form-group">
                    <label>Name</label>
                <input type="text" className="form-control" onChange={this.getName}></input>
                </div>

                <div className="form-group">
                    <label>Email</label>
                <input type="email" className="form-control" onChange={this.getEmail}></input>
                </div>

                <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" onChange={this.getPassword}></input>
                </div>

                <div style={{color:"red"}}>
                    {this.state.errorMessage}
                </div>
              <button className="btn text-light form-control" style={{backgroundColor:"#043d76"}} onClick={this.register}>Register</button>
            </div>
		)
	}
}

export default Signup;
