import { Route } from "react-router"
import Order from './Order'
import Payment from './Payment'
import Address from './Address'
import CartSummary from "./CartSummary"
import { useRouteMatch, Link, Redirect,Switch } from "react-router-dom"
import { connect } from "react-redux"
import '../../assets/checkout.modules.css'

function Checkout(props) {
  const route = useRouteMatch()
  const url = route.url
  const path = route.path


  return (
      <div className="row">
        <div className="col-4 px-3 pt-5">
          <ul className="nav navbar-nav text-left nav-bar-style checkout-navbar">
            <Link className="checkoutTabs enabledLink" to="/checkout"><li>Cart Summary </li></Link>
            {props?.done_check_steps > 0 ? <Link className="checkoutTabs enabledLink" to={url + "/address"}><li>Add Address</li></Link> : <li className="checkoutTabs DisabledLink">Add Address</li>}
            {props?.done_check_steps > 1 ? <Link className="checkoutTabs enabledLink" to={url + "/payment"}><li>Payment</li></Link> : <li className="checkoutTabs DisabledLink">Payment</li>}
            {props?.done_check_steps > 2 ? <Link className="checkoutTabs enabledLink" to={url + "/order"}><li>Order</li></Link> : <li className="checkoutTabs DisabledLink">Order</li>}
          </ul>
        </div>
        <div className="col-8 my-3">
        <Switch>
          <Route exact path={path} component={CartSummary} />
          {props?.done_check_steps > 0 && <Route exact path={path + "/address"} component={Address} /> }
          {props?.done_check_steps > 1 && <Route exact path={path + "/payment"} component={Payment} /> }
          {props?.done_check_steps > 2 && <Route exact path={path + "/order"} component={Order} /> }
          <Route path="/*">
            <Redirect to="/checkout" />
          </Route>
          </Switch>
        </div>
      </div>
  )
}

export default connect(function (state, props) {
  return {
    current_check_step: state?.current_check_step,
    done_check_steps: state?.done_check_steps
  };
})(Checkout);
