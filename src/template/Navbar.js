import { Link } from "react-router-dom";
import { useState } from "react"
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar(props) {
  //console.log('nav props',props)

  let [searchkey, setSearchkey] = useState('');
  let getSearchVal = (e) => {
    setSearchkey(e.target.value)
  }

  let logout = (event) => {
    event.preventDefault()
    props.dispatch({
      type: "LOGOUT",
    })
    toast.configure()
    toast.success("You have logged Out successfully!")
    props.history.push("/");
  }

  return (
    <header className="Site-header">
      <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: "#043d76" }}>
        <Link to="/" className="navbar-brand title text-light"> <b>My cakeshop</b></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto  text-light">
            {/* <li>{props.children}   Hello {props.user}</li> */}
            {props.user && <li>Welcome {props.user}</li>}

          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" onChange={getSearchVal} type="search" placeholder="Search" aria-label="Search" />
            {/* <Link to={"/search/"+searchkey}> <button className="btn btn-outline-success my-2 my-sm-0" type="button">Search</button></Link> */}

            {/* with query string */}
            <Link to={`/search?q=${searchkey}`}><button className="btn my-2 my-sm-0 text-light" style={{ backgroundColor: "#1e77d07a" }} type="button"><FontAwesomeIcon icon={faSearch} /></button></Link>
          </form>
          <div>
            {
              props.loginstatus ?
                <div>
                  <Link to="/cart" className="btn m-2 my-sm-0 mr-2 text-light" style={{ backgroundColor: "#1e77d07a" }} ><FontAwesomeIcon icon={faShoppingCart} /><b className="pl-1">{props.cart_data_length > 0 ? props.cart_data_length : ''}</b></Link>
                  <Link to="/myorders" className="btn my-sm-0 text-light" style={{ backgroundColor: "#1e77d07a" }} ><b>My Orders</b></Link>

                  <button onClick={logout} className="btn btn-danger  m-2">Logout</button>
                </div>
                : <Link to="/login"> <button className="btn text-light m-2" style={{ backgroundColor: "#1e77d07a" }}>Login</button></Link>
            }
          </div>
        </div>
      </nav>
    </header>
  );
}
export default connect(function (state, props) {
  return {
    //?. this checks  if exists then
    user: state?.user?.name,
    loginstatus: state?.isloggedin,
    cart_data_length: state?.user_cart?.length
  }
})(Navbar)