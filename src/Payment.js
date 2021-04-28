import {connect} from "react-redux"
import {useState, useEffect} from "react"


function Payment(props){

    useEffect(() => {
     
        props.dispatch({
            type: "UPDATE_CURRENT_CHECKOUT_STEP",
            payload: 3,
        });

    }, []);

    var confirmPaymode = ()=>{
        props.history.push('/checkout/order')
    }

    return(
        <>
        <h2>Payment Page</h2>
        <div className="container">
            <input type="radio"  defaultChecked  /> Cash on Delivery
            <br/>
        <button type="button" className=" mt-3 btn btn-success" onClick={confirmPaymode} >Proceed Further</button>
        </div>
        </>
    )
}
export default connect(function(state,props){

    return{
        current_check_step: state?.current_check_step,
        done_check_steps: state?.done_check_steps
    }
})(Payment)