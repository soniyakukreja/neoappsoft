import {connect} from "react-redux"
import {Link} from "react-router-dom"

import axios from "axios"
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
const api_base  = process.env.REACT_APP_BASE_URL

function Cart(props){
    
    var removefromCart = function(cakeid, array_index){
        axios({
            url:api_base+"removecakefromcart",
            method:"post",
            data: {cakeid: cakeid},
            headers : {
                authtoken: localStorage.token
            }
        }).then((response)=>{
            if(response.data){
                props.dispatch({
                    type:"REMOVE_CART_DATA",
                    payload :cakeid,
                    array_index:array_index
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
        <main className="Site-content Site-content--full">
        <div className="row">
                {props.cartDetails?.length >0  ? 
                <>
                    <div className="col-8">
                    {props.cartDetails?.length >0 && props.cartDetails.map((each,index) => {

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
                                    <button className="btn btn-danger my-2 my-sm-0" onClick={() => removefromCart(each.cakeid, index)}  > Remove</button>
                                </div>

                            </div>
                            
                        )
                    })}
               
                  
                
               </div>
                <div className="col-4">
                    <div className="row m-3 p-3 border rounded text-center">
                        <div className="col-sm-6"><u>Total Items</u><br/>{Count}</div>
                        <div className="col-sm-6"><u>Total Price</u><br/>{TotalPrice}</div>

                    </div>
                    <div className="row m-3 p-3 float-right"><Link to="/checkout"><button className="themebtn"> Checkout</button></Link></div>
                </div>
                </>
                :
                <div className="alert alert-danger m-3 text-center col-12"><center>CART is empty</center></div>
                }
            </div>
        </main>
    )
}


export default connect(function(state, props){
    //console.log('cart state',state)
    return {
        cartDetails :state?.user_cart
    }
})(Cart)

