import { Component } from "react"

class ErrorBoundary extends Component{
    constructor(){
        super()
        this.state = {
            hasError:false
        }
    }

    // this function runs whenever a error is found and  return an object
    //that object gets merged in state 
    static getDerivedStateFromError(error){
        return {
            hasError:true
        }
    }

    // componentDidCatch(error,errorInfo){
    // not really used
    // but if we want to maintain logs like when a user and how many times he logs in our website  that we can manage here
    // }

    render(){
        if(this.state.hasError){
            return (
                <div>
                    <h1>Oops! some error occured</h1>
                </div>
            )
        }else{
           return this.props.children
        }
    }

}
export default ErrorBoundary

// here are few categories of errors that are not cached in this and this cathes only run time errors not compile time and async and event handler errors are not catched