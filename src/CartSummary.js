import {connect} from "react-redux"
import {Link,withRouter } from "react-router-dom"
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//import Cake from './Cake'
import axios from "axios"
//import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";

function CartSummary(props){

    console.log('summary props',props)
    var [check_stage,setCheck_stage] = useState(1)

    console.log('check_stage',check_stage)

    var TotalPrice = 0
    var Count = 0

    let confirm_summary = (e)=>{
        setCheck_stage(2)
        console.log('after check_stage',check_stage)
        // props.dispatch({
        //     type: "CHECKOUT_STAGE",
        //     payload: 2,
        // });
        //props.history.push("/checkout/address");
    }

useEffect(() => {
    if (props.checkout_stage===2) {
      //props.history.push("/checkout/address");
    }
  }, [props.checkout_stage]);

    return(
        <>
        <table className="table table-hover">
        {props.user_cart?.length >0  ? 
        <>
        {props.user_cart?.length >0 && props.user_cart.map((each,index) => {
            TotalPrice += each.price
            Count += 1

            return(

                <tr key={index}>
                    <td className="text-center">
                        <img src={each.image} className=""  alt="..." style={{height:"40px", width:"40px"}}  />
                    </td>
                    <td className="text-center">
                        {each.name}
                    </td>
                    <td className="text-right">
                        {each.price}
                    </td>
                </tr>
            )
        })}   
        
            
            <tr>
            <td></td>
                <td  className="text-right"><b>Total Amount</b></td>
                <td className="text-right"><b>{TotalPrice}</b></td>
            </tr>
            <tr><td colSpan="3" className="text-center"> <button className="btn btn-success" onClick={confirm_summary}>Next</button> </td></tr>
            </>
            :<tr><td colSpan="3" className="text-danger">Cart is Empty</td></tr>
            }
        </table>
        </>
    )
}

export default connect(function (state, props) {
    
    return {
        token: state?.user?.token,
        checkout_stage: state?.checkout_stage,
        user_cart: state?.user_cart
    };
    })(CartSummary)
