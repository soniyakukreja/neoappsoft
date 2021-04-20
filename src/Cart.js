import {connect} from "react-redux"
import {Link,withRouter } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Cake from './Cake'
import axios from "axios"
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";

function Cart(props){
    var [cartDetails, setcartDetails]=useState([])

    var removefromCart = function(){
        let token = localStorage.token
        axios({
            url:"https://apibyashu.herokuapp.com/api/removefromcart",
            method:"post",
            data: {},
            headers : {
                authtoken: token
            }
        }).then((response)=>{
            console.log("response from cakes api : ",response)
            setcartDetails(response.data.data)
        }, (error)=>{
            console.log("response from cakes api : ",error)
        })
    }

    useEffect(()=>{
        let getCartDetailsAPI = "https://apibyashu.herokuapp.com/api/cakecart"
        let token = localStorage.token
        axios({
            url:getCartDetailsAPI,
            method:"post",
            data: {},
            headers : {
                authtoken: token
            }
        }).then((response)=>{
            console.log("response from cakes api : ",response)
            setcartDetails(response.data.data)
        }, (error)=>{
            console.log("response from cakes api : ",error)
        })
    }, [])
    var TotalPrice = 0
    var Count = 0
    // /addcaketocart
    return(
        <div>
            <div className="row">
                {cartDetails?.length >0  ? 
                <div className="col-m-12">
                    <div className="col-m-8">
                    {cartDetails?.length >0 && cartDetails.map((each,index) => {
                        TotalPrice += each.price
                        Count += 1

                        return(

                            <div className="row m-3 p-3 border rounded" key={index}>
                                <div className="col-sm-3">
                                    <img src={each.image} className="card-img-top" alt="..." height="40px" width="40px" />
                                </div>
                                <div className="col-sm-4">
                                    {each.name}
                                </div>
                                <div className="col-sm-3">
                                    {each.price}
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-warning my-2 my-sm-0" onClick={removefromCart}><FontAwesomeIcon icon={faTrash} /> Remove</button>
                                </div>

                            </div>
                            
                        )
                    })}
               
                  
                </div>
                 <div className="col-m-4">
                    <div className="row m-3 p-3 border rounded text-center">
                        <div className="col-sm-6"><u>Total Items</u><br/>{TotalPrice}</div>
                        <div className="col-sm-6"><u>Total Price</u><br/>{Count}</div>

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

export default Cart

// Cart =  withRouter(Cart)
// export default connect(function(states,props){
//     //return{}
// })(Cart)