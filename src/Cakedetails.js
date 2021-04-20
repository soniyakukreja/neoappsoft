import {useParams} from "react-router-dom"
import axios from "axios"
import { useEffect, useState} from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux"
const star = <FontAwesomeIcon icon={faStar} />
const heart = <FontAwesomeIcon icon={faHeart} />

function Cakedetails(props) {
  console.log('cakedetail peops',props);

  let [cakedetail,setCakedetails] = useState({})
  let params = useParams();
  console.log('cakedetail params............',params)

  useEffect(()=>{
    let cakedetailsapi = "https://apibyashu.herokuapp.com/api/cake/"+params.cakeid;
    axios({
      method:"get",
      url:cakedetailsapi
    }).then((response)=>{
      setCakedetails(response.data.data);
    },(error)=>{
      console.log("error found",error)
    })
  },[])

  var addtocart = function(e){
    e.preventDefault()
    alert('add')
    console.log('cakedetail.... in adtocart',cakedetail.cakeid)
    if(localStorage.token && props.user){
      var token = localStorage.token 
      axios({
        method:"post",
        url:"https://apibyashu.herokuapp.com/api/addcaketocart",
        data:{
          cakeid:cakedetail.cakeid,
          name:cakedetail.name,
          image:cakedetail.image,
          price:cakedetail.price,
          weight:cakedetail.weight
        },
        headers:{
          authtoken:token
        }
      }).then((response)=>{
        props.dispatch({
          type:"ADD_CART_DATA"
        })
      },(error)=>{

      })
    }
  }


  return (
    <div className="cakedetails" style={{ marginTop:"20px",paddingLeft:"30px"}}>
    <h2>Cake Details Section</h2>
	    <div className="row">
         <div className="col-md-6">
           <img src={cakedetail.image} style={{height:"250px",width:"390px"}} className="card-img-top" alt="..." />
         </div>

         <div className="col-md-6">
           <p>NAME:- {cakedetail.name} </p>           
           <p>PRICE:-{cakedetail.price}/- Rs Only</p>
           <p>INGRIDIENTS:-Cake,Cream,Choco Chips</p>
           <p>DESCRIPTIONS:-{cakedetail.description}</p>
           <div className="pb-3">
                <span className="text-warning">{star} 4.5</span>
                <br/><span style={{fontSize: "18px"}}>41 reviews</span>
            </div>
          
           <button type="button" onClick={addtocart} className="btn btn-warning text-uppercase p-3 text-white mr-2 font-weight-bold">Add to cart</button>
            <button type="button" className="btn btn-warning p-3 text-white font-weight-bold">{heart}</button>
 
         </div>
	      </div>
      </div>
  );
}

export default  connect(function(state,props){
  return {
    user :state?.user?.name,
    loginstatus:state?.isloggedin
  }
})(Cakedetails);