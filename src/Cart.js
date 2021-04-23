import {connect} from "react-redux"
import {Link,withRouter } from "react-router-dom"

import Cake from './Cake'
import axios from "axios"
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";

function Cart(props){
    console.log('cart props',props)
   //var [cartDetails, setcartDetails]=useState()
    
    var removefromCart = function(cakeid, array_index){
        //console.log('cakeid')
        axios({
            url:"https://apibyashu.herokuapp.com/api/removecakefromcart",
            method:"post",
            data: {cakeid: cakeid},
            headers : {
                authtoken: localStorage.token
            }
        }).then((response)=>{
            console.log("removecart response : ",response)
            if(response.data){
                props.dispatch({
                    type:"REMOVE_CART_DATA",
                    payload :cakeid
                })
               //setcartDetails(response.data.data)
               alert(response.data.message)
            }
        }, (error)=>{
            console.log("removecart error : ",error)
        })
    }


    var TotalPrice = 0
    var Count = 0
    // /addcaketocart
    return(
        <div>
            <div className="row">
                {props.cartDetails?.length >0  ? 
                <div className="col-m-12">
                    <div className="col-m-8">
                    {props.cartDetails?.length >0 && props.cartDetails.map((each,index) => {
                        // console.log('each',each);
                        // console.log('eachimage',each.image)
                        TotalPrice += each.price
                        Count += 1

                        return(

                            <div className="row m-3 p-3 border rounded" key={index}>
                                <div className="col-sm-3">
                                    <div height="50px" width="50px">
                                    <img src={each.image} className="card-img-top" alt="..." height="50px"  />
                                </div>
                                </div>
                                <div className="col-sm-4">
                                    {each.name}
                                </div>
                                <div className="col-sm-3">
                                    {each.price}
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-warning my-2 my-sm-0" onClick={() => removefromCart(each.cakeid, index)}  > Remove</button>
                                </div>

                            </div>
                            
                        )
                    })}
               
                  
                </div>
                 <div className="col-m-4">
                    <div className="row m-3 p-3 border rounded text-center">
                        <div className="col-sm-6"><u>Total Items</u><br/>{Count}</div>
                        <div className="col-sm-6"><u>Total Price</u><br/>{TotalPrice}</div>

                    </div>
                    <div className="row m-3 p-3 float-right"><Link to="/checkout"><button className="btn btn-success my-2 my-sm-0"> Checkout</button></Link></div>
                </div>
                </div>:
                <div className="row" ><div className=" m-3 text-center">CART is empty</div></div>
                }
            </div>
        </div>
    )
}


export default connect(function(state, props){
    console.log('cart state',state)
    return {
        cartDetails :state?.user_cart
    }
})(Cart)

