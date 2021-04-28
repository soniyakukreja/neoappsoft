import { Route } from "react-router"
import Order from './Order' 
import Payment from './Payment' 
import Address from './Address' 
import CartSummary from "./CartSummary"
import {useRouteMatch, Link } from "react-router-dom"
import {connect} from "react-redux"
import {useEffect}  from "react"
import $ from 'jquery';




function Checkout(props){
  var LinkClass = "px-2 py-3 border-top border-bottom text-decoration-none "

  console.log('>>>>>>>>>>>>>>>>>>>current_check_step',props.current_check_step)
  console.log('>>>>>>>>>>>>>>>>>>>done_check_steps',props.done_check_steps)
  

  useEffect(() => {
    console.log('>>>>>>>inside checkout effect')
    // disableLinks()
    // if(props.clicked_step <= props.checkout_step){
    //     for (var i = 0; i < props.checkout_step; i++) {
    //         enableLinks(i, 'light-warning')
    //     }
    //     enableLinks(props.clicked_step -1, 'bg-warning') 
    // } 
//     props.dispatch({
//       type: "UPDATE_CURRENT_CHECKOUT_STEP",
//       payload:1
//   });
}, []);

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

const navbarLink = (url, link_index, event) => {
    event.preventDefault()
    if(link_index <= props.checkout_step){
        props.dispatch({
            type: "UPDATE_CHECKOUT_STEP",
            click_no: link_index,
        });
        props.history.push(url);
    }
  };


   
    var route =  useRouteMatch()
    var url = route.url
    var path = route.path

  
    return(
      <>
        <h2 className="text-center mt-3">Checkout </h2>
        <div className="row mt-3">
             <div className="col-4 px-3">

            {/* <ul class="nav navbar-nav text-center nav-bar-style checkout-navbar">
                <Link onClick={(e) => {navbarLink(url, 1,e);}} className="active" style={{textDecoration:"none"}}><li className={LinkClass }>Cart Summary</li></Link>
                <Link onClick={(e) => {navbarLink(url+"/address", 2,e);}} style={{textDecoration:"none"}}><li className={LinkClass} >Address</li></Link>
                <Link onClick={(e) => {navbarLink(url+"/payment", 3,e);}} style={{textDecoration:"none"}}><li className={LinkClass }>Payment</li></Link>
                <Link onClick={(e) => {navbarLink(url+"/order", 4,e);}} style={{textDecoration:"none"}}><li className={LinkClass }>Order</li></Link>
            </ul> */}

           
           

             <ul className="nav navbar-nav text-left nav-bar-style checkout-navbar">
                <li><Link  className="disabled" to="/checkout">Cart Summary</Link></li>
                <li><Link to={url+"/address"}>Add Address</Link></li>
                <li><Link to={url+"/payment"}>Payment</Link></li>
                <li><Link to={url+"/order"}>Order</Link></li>
                </ul>  
            </div>
            <div className="col-8 my-3">
                <Route exact path={path}  component={CartSummary} />
                <Route exact path={path+"/payment"}  component={Payment} />
                <Route exact path={path+"/address"}  component={Address} />
                <Route exact path={path+"/order"}  component={Order} />
            </div>
        </div>
        </>
    )
}

export default connect((state, props)=> {
return {
    //token: state?.user?.token,
    // checkout_step : state?.checkout_step,
    // clicked_step: state?.clicked_step
    current_check_step: state?.current_check_step,
   done_check_steps: state?.done_check_steps
};
})(Checkout);

//export default Checkout
