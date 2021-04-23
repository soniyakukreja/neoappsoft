import { Route } from "react-router"
import Order from './Order' 
import Payment from './Payment' 
import Address from './Address' 
import CartSummary from "./CartSummary"
import {useRouteMatch, Link } from "react-router-dom"
import {connect} from "react-redux"
//import {useEffect}  from "react"

function Check(props){
    console.log('checkout props',props)
    var route =  useRouteMatch()
    var url = route.url
    var path = route.path

    

  var currentpath = props.location.pathname;


    return(
      <>
        <h2 className="text-center mt-3">Checkout </h2>
        <div className="row mt-3">
             <div className="col-4 px-3">


               <ul className="">
                <li><Link to="/check">Cart Summary</Link></li>
                <li><Link to={url+"/address"}>Add Address</Link></li>
                <li><Link to={url+"/payment"}>Payment</Link></li>
                <li><Link to={url+"/order"}>Order</Link></li>
                <li><Link to={url+"/test"}>Test</Link></li>
                </ul> 
            </div>
            <div className="col-8 my-3">
                <Route  path={path}  component={Address} />
                <Route exact path={path+"/payment"}  component={Payment} />
                <Route exact path={path+"/address"}  component={Address} />
                <Route exact path={path+"/order"}  component={Order} />
                <Route exact path={path+"/test"}  component={Order} />

            </div>

        </div>
        </>
    )
}

export default connect(function (state, props) {
return {
    token: state?.user?.token,
    checkout_stage: state?.checkout_stage,
};
})(Check);