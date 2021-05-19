import { connect } from "react-redux"
import { useRouteMatch, Link, withRouter } from "react-router-dom"
import { useState, useEffect } from "react";

function CartSummary(props) {

    var [current_check_step, setCurrentCheckStep] = useState(1)
    var [check_stage, setCheck_stage] = useState(1)

    var route = useRouteMatch()
    var url = route.url
    var path = route.path
    var TotalPrice = 0
    var Count = 0

    let confirm_summary = (e) => {
        props.dispatch({
            type: "CHECKOUT_STAGE",
            payload: 1,
        });
        props.history.push("/checkout/address");
    }
    useEffect(() => {
        props.dispatch({
            type: "UPDATE_CURRENT_CHECKOUT_STEP",
            payload: 1,
        });
    }, []);


    return (
        <><h2 className="themeHead">Your Products in cart</h2>
            { props.user_cart?.length > 0 ?
                <>

                    <table className="table table-hover">
                        <thead><tr>
                            <th className="text-left">Product</th>
                            <th className="text-left">Name</th>
                            <th className="text-right">Price</th>
                        </tr></thead>
                        <tbody>
                            {props.user_cart?.length > 0 && props.user_cart.map((each, index) => {
                                TotalPrice += each.price
                                Count += 1
                                return (
                                    <tr key={index}>
                                        <td className="text-left">
                                            <img src={each.image} className="" alt="..." style={{ height: "40px", width: "40px" }} />
                                        </td>
                                        <td className="text-left">
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
                                <td className="text-right"><b>Total Amount</b></td>
                                <td className="text-right"><b>{TotalPrice}</b></td>
                            </tr>
                        </tbody>
                    </table>
                    <center><button className="themebtn" onClick={confirm_summary} >Next</button></center>
                </>
                : <div className="mt-5 alert alert-danger" role="alert" >Cart is Empty</div>
            }
        </>
    )
}

export default connect(function (state) {
    return {
        user_cart: state?.user_cart,
        current_check_step: state?.current_check_step,
        done_check_steps: state?.done_check_steps
    };
})(CartSummary)
