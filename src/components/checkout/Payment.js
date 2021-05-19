import {connect} from "react-redux"
import {useEffect} from "react"

function Payment(props){

    useEffect(() => {
        props.dispatch({
            type: "UPDATE_CURRENT_CHECKOUT_STEP",
            payload: 3,
        });

    }, []);

    var confirmPaymode = ()=>{
        props.dispatch({
            type:"SAVE_PAYMODE",
        })
        props.history.push('/checkout/order')
    }

    return(
        <div className="checkoutContainer">
            <h2 className="themeHead">Select your payment mode here</h2>
            <div className="text-center mt-2 mb-2">
                <input type="radio" className="pr-2" defaultChecked  /> Cash on Delivery
                <br/>
                <small>Currenty only COD is available</small>
                <br/>
                <center><button type="button" className="mt-2 themebtn" onClick={confirmPaymode} >Proceed Further</button></center>
            </div>
        </div>
    )
}
export default connect(function(state,props){

    return{
        current_check_step: state?.current_check_step,
        done_check_steps: state?.done_check_steps
    }
})(Payment)