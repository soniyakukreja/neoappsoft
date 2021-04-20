import { Link } from "react-router-dom";
import { useEffect, useState} from "react"
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

function Navbar(props) {
  console.log('navprops',props);
  var onlinestaus=0;

  let [searchkey,setSearchkey] = useState('');
  let getSearchVal=(e)=>{
    setSearchkey(e.target.value)
    
  }

  let logout = (event)=>{
    event.preventDefault()
    props.dispatch({
        type:"LOGOUT",
    })
    
    console.log('AFTERlogout',props)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link to="/"> <a className="navbar-brand">My cakeshop</a></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
     {/* <li>{props.children}   Hello {props.user}</li> */}
     {props.user  &&  <li>Welcome {props.user}</li> }
     
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2"  onChange={getSearchVal} type="search" placeholder="Search" aria-label="Search"/>
      {/* <Link to={"/search/"+searchkey}> <button className="btn btn-outline-success my-2 my-sm-0" type="button">Search</button></Link> */}
   
   {/* with query string */}
    <Link to={`/search?q=${searchkey}`}><button className="btn btn-success my-2 my-sm-0" type="button"><FontAwesomeIcon icon={faSearch} /></button></Link>
    </form>
    <div>
       {
         props.loginstatus ? 
         <div>
         <Link to="/cart" className="btn btn-warning my-2 my-sm-0 text-white mr-2"><FontAwesomeIcon icon={faShoppingCart} /> ({props.cart_data_length})</Link>

         <button onClick={logout} className="btn btn-danger">Logout</button>
         </div>
         : <Link to="/login"> <button className="btn btn-success">Login</button></Link>
        }
    </div>
  </div>
</nav>
  );
}
//export default Navbar;
export default connect(function(state,props){
  //console.log('navestate',state.cart_data.length)
  return {
    // user :state && state["user"]["name"],
    // loginstatus:state && state["isloggedin"]

    //?. this checks  if exists then
    user :state?.user?.name,
    loginstatus:state?.isloggedin,
   // user_cart_length :state?.cart_data?.cart_data.length
    }
})(Navbar)