import { Route } from "react-router"
import Order from './Order' 
import Payment from './Payment' 
import Address from './Address' 
import CartSummary from "./CartSummary"
import {useRouteMatch, Link } from "react-router-dom"
import {connect} from "react-redux"
import {useEffect}  from "react"



function Checkout(props){
    console.log('checkout props',props)
    var route =  useRouteMatch()
    var url = route.url
    var path = route.path

    

  var currentpath = props.location.pathname;
 console.log('prop state',props.checkout_stage)
  console.log('currentpath',currentpath)
  console.log('url',url)
  console.log('prop state',props.checkout_stage)

//   useEffect(() => {
//     if (!props.token) {
//       props.history.push("/");
//     }
//   }, [props.token]);

    return(
        <div className="row">
            <div className="col-4 px-3">

            <div
            class="nav flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"  >
            <Link to={url} className="remove-line">
              <li
                className={`checkout-link nav-link ${
                  url === currentpath && "active"
                }`}
                id="v-pills-home-tab"
                data-toggle="pill"
              >
                Cart Summery
              </li>
            </Link>
            {props.checkout_stage === 1 ? (
              <li
                className="checkout-link nav-link"
                style={{ cursor: "not-allowed" }}
              >
                Address
              </li>
            ) : (
              <Link to={url + "/address"} className="remove-line">
                <li
                  className={`checkout-link nav-link ${
                    url + "/address" === currentpath && "active"
                  }`}
                  id="v-pills-profile-tab"
                  data-toggle="pill"
                >
                  Address
                </li>
              </Link>
            )}
            {props.checkout_stage === 2 || props.checkout_stage === 1 ? (
              <li
                className={`checkout-link nav-link`}
                style={{ cursor: "not-allowed" }}
              >
                Payment
              </li>
            ) : (
              <Link to={url + "/payment"} className="remove-line">
                <li
                  className={`checkout-link nav-link ${
                    url + "/payment" === currentpath && "active"
                  }`}
                  id="v-pills-messages-tab"
                  data-toggle="pill"
                >
                  Payment
                </li>
              </Link>
            )}
            {props.checkout_stage !== 4 ? (
              <li
                className={`checkout-link nav-link`}
                style={{ cursor: "not-allowed" }}
              >
                Order
              </li>
            ) : (
              <Link to={url + "/order"} className="remove-line">
                <li
                  className={`checkout-link nav-link ${
                    url + "/order" === currentpath && "active"
                  }`}
                  id="v-pills-settings-tab"
                  data-toggle="pill"
                >
                  Order
                </li>
              </Link>
            )}
          </div>

                {/* <ul className="">
                <li><Link  className="disabled" to="/checkout">Cart Summary</Link></li>
                <li><Link to={url+"/address"}>Add Address</Link></li>
                <li><Link to={url+"/payment"}>Payment</Link></li>
                <li><Link to={url+"/order"}>Order</Link></li>
                </ul> */}
            </div>
            <div className="col-8 my-3">
                <Route exact path={path}  component={CartSummary} />
                <Route exact path={path+"/payment"}  component={Payment} />
                <Route exact path={path+"/address"}  component={Address} />
                <Route exact path={path+"/order"}  component={Order} />

            </div>

        </div>
    )
}

export default connect(function (state, props) {
return {
    token: state?.user?.token,
    checkout_stage: state?.checkout_stage,
};
})(Checkout);
