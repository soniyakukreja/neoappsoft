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
        <div>Paymenty</div>
    )
}
export default connect(function(state,props){

    return{
        current_check_step: state?.current_check_step,
        done_check_steps: state?.done_check_steps
    }
})(Payment)