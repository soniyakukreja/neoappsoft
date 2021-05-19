import { connect } from "react-redux"
import axios from "axios"
import { useEffect, useState } from "react"
const api_base  = process.env.REACT_APP_BASE_URL


function Order(props){
    var [orderTotal,setOrderTotal] = useState(0)

    var TotalPrice = 0
    useEffect(()=>{
        props.user_cart.map((each,index) => {
            TotalPrice += each.price
        })
        setOrderTotal(TotalPrice)
    },[orderTotal])


    var confirmOrder = ()=>{
         if (localStorage.token) {
            let data = props.address;
            data.price = orderTotal;
            data.cakes = props.user_cart;

      axios({
        method: "post",
        url :api_base+"addcakeorder",
        data: data,
        headers : {
            authtoken: localStorage.token
        }
      }).then((response) => {
        props.dispatch({
          type: "ORDER_DONE",
        })
        props.history.push('/myorders')
    }, (error) => {
        console.log("user get cart api error : ", error)
      })
    }
    }

    return(
        <>
        <h2 className="themeHead">Place your order</h2>
        <div className="checkoutContainer text-center">
            <p>Your Order Total <b>{ orderTotal }</b></p>
            <button type="button" className="themebtn" onClick={confirmOrder} >Confirm Order</button>
        </div>
        </>
    )
}
export default connect((state,props)=>{
    return {
        user_cart:state?.user_cart,
        address:state?.address,
    }
})(Order)