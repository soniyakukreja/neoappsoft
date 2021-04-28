import { connect } from "react-redux"
import axios from "axios"
import { useEffect, useState } from "react"

function Order(props){
    var [orderTotal,setOrderTotal] = useState(0)

    var TotalPrice = 0
    useEffect(()=>{

        props.user_cart.map((each,index) => {
            TotalPrice += each.price
        })

        setOrderTotal(TotalPrice)
        console.log('TotalPrice',TotalPrice)

    },[props.orderTotal])


    var confirmOrder = ()=>{
        console.log('ordr props',props)


         if (localStorage.token) {
            let data = props.address;
            data.price = props.orderTotal;
            data.cakes = props.user_cart;
            console.log('data',data)

            // var data = {
            //     price: TotalPrice, 
            //     name: props.address?.name, 
            //     phone: props.address?.phone, 
            //     address: props.address?.address, 
            //     city: props.address?.city, 
            //     pincode: props.address?.pincode, 
            //     cakes: props.cartDetails
            //   }

      axios({
        method: "post",
        url :"https://apibyashu.herokuapp.com/api/addcakeorder",
        data: data,
        headers : {
            authtoken: localStorage.token
        }
      }).then((response) => {

       // console.log("app cakecart response : ", response)

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
        <h2>Order Page</h2>
        <div className="container">
            <p>Submit my order</p>
        <button type="button" className=" mt-3 btn btn-success" onClick={confirmOrder} >Confirm Order</button>
        </div>
        </>
    )
}
export default connect((state,props)=>{
    return {
        user_cart:state?.user_cart,
        address:state?.address,
        orderTotal:state?.orderTotal
    }
})(Order)