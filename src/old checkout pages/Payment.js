import {connect} from "react-redux"
import {useState, useEffect} from "react"


function Payment(props){

    useEffect(() => {
     
        props.dispatch({
            type: "UPDATE_CURRENT_CHECKOUT_STEP",
            payload: 3,
        });

    }, []);

    return(
        <>
        <h4>Payment MODE</h4>
        <input type="radio"  defaultChecked value="COD" /> 
        <p>Cash on delivery (COD) available only. </p>
        <button class="btn btn-success">Next</button>
        </>
    )
}
export default connect(function(state,props){

    return{
        current_check_step: state?.current_check_step,
        done_check_steps: state?.done_check_steps
    }
})(Payment)