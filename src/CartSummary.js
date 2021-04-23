import {connect} from "react-redux"
import { useRouteMatch, Link, withRouter } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react";
import $ from 'jquery';

function CartSummary(props){

    var [current_check_step,setCurrentCheckStep] = useState(1)
    //console.log('summary props',props)
    var [check_stage,setCheck_stage] = useState(1)

    //console.log('check_stage',check_stage)
    var route =  useRouteMatch()
    var url = route.url
    var path = route.path
    var TotalPrice = 0
    var Count = 0

    let confirm_summary = (e)=>{
        setCheck_stage(2)
       // console.log('after check_stage',check_stage)
        props.dispatch({
            type: "CHECKOUT_STAGE",
            payload: 2,
        });
        props.history.push("/checkout/address");
    }

    const navbarLink = (url, link_index, event) => {
        event.preventDefault()
       // console.log('link_index',link_index)
        //console.log('props.checkout_step',props.checkout_step)
        //if(link_index <= props.checkout_step){
            props.dispatch({
                type: "UPDATE_CHECKOUT_STEP",
                click_no: link_index,
            });
            props.history.push(url);
       // }
      };
    


    function enableLinks(index, bgColor){
        $('ul.checkout-navbar > a:eq('+ index +')')
                    .removeClass('cursor-default');
        $('ul.checkout-navbar > a > li:eq('+ index +')')
                    .removeClass('bg-light disabled-link text-muted');
        $('ul.checkout-navbar > a > li:eq('+ index +')')
                    .addClass(bgColor + ' text-white');
    }
    
    function disableLinks(){
        $('ul.checkout-navbar > a')
                    .addClass('cursor-default');
        $('ul.checkout-navbar > a > li')
                    .addClass('bg-light disabled-link text-muted');
    }

    useEffect(() => {
     
        props.dispatch({
            type: "UPDATE_CURRENT_CHECKOUT_STEP",
            payload: 1,
        });

    }, []); 
   // useEffect(() => {
        // disableLinks()
        // if(props.clicked_step <= props.checkout_step){
        //     for (var i = 0; i < props.checkout_step; i++) {
        //         enableLinks(i, 'light-warning')
        //     }
        //     enableLinks(props.clicked_step -1, 'bg-warning') 
        // } 
       
    //}, []);



    var updateClickStep = (step)=>{
        props.dispatch({
            type: "UPDATE_CURRENT_CHECKOUT_STEP",
            payload: step,
        });
    }

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
            <tr><td colSpan="3" className="text-center"> <button className="btn btn-success" onClick={updateClickStep(2)} >Next</button> </td></tr>
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
        user_cart: state?.user_cart,
        current_check_step: state?.current_check_step,
        done_check_steps: state?.done_check_steps
    };
    })(CartSummary)
