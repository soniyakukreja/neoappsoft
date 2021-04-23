import {useParams} from "react-router-dom"
import axios from "axios"
import { useEffect, useState} from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux"
import Spinner from "./UI/Spinner";

const heart = <FontAwesomeIcon icon={faHeart} />

function Cakedetails(props) {

  const [loading, setLoading] = useState(false);

  let [cakedetail,setCakedetails] = useState({})
  let params = useParams();

  useEffect(()=>{
    setLoading(true);
    let cakedetailsapi = "https://apibyashu.herokuapp.com/api/cake/"+params.cakeid;
    axios({
      method:"get",
      url:cakedetailsapi
    }).then((response)=>{
      setCakedetails(response.data.data);
      setLoading(false);
    },(error)=>{
      console.log("error found",error)
      setLoading(false);
    })
  },[])

  var addtocart = function(e){
    setLoading(true);
    e.preventDefault()
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
          type:"ADD_CART_DATA",
          payload: response.data.data
        })
        alert('Added to your cart')
        setLoading(false);
        props.history.push("/cart")

      },(error)=>{

      })
    }else{
      alert('Please Login to proceed')
      setLoading(false);
    }
  }


  return (
    loading?( <Spinner />
      ):(
    <div className="cakedetails" style={{ marginTop:"20px",paddingLeft:"30px"}}>
	    <div className="row">
         <div className="col-md-4">
           <img src={cakedetail.image} style={{height:"400px",width:"390px"}} className="card-img-top" alt="..." />
         </div>
         <div className="col-md-6 ml-3">
         <div className="row ">
           <div className="col-2"> <strong class="reviewPoint" style={{
                display: "inline-block",
                background: `url(https://img.floweraura.com/sites/default/files/ssr/static/media/fill_star.7ae2f2da.svg) no-repeat 0 0`,
                backgroundPosition: "4px 4px",
                backgroundSize: "19px",
                padding: "5px 8px 6px 30px",
                fontSize: "14px",
                fontWeight: "700",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "1.25",
                letterSpacing: "normal",
                textAlign: "left",
                color: "#1c2120",
                borderRadius: "5px",
                boxShadow: `0 0 10px 0 rgb(0 0 0 / 10%)`,
                backgroundColor: "#fff",
            }}>4.7</strong>  </div>
             <div className="col-11"><h2>{cakedetail.name} </h2>  </div>
           </div>
           
            <center>
           
            </center> 
            <br/>      
            <div className="row  mt-2">
           <div className="col-3"><b>PRICE:</b></div><div className="col-9">{cakedetail.price}/- Rs Only </div>  
           </div><div className="row  mt-2">
           <div className="col-3"><b>INGRIDIENTS:</b></div><div className="col-9">Cake,Cream,Choco Chips </div>  
           </div><div className="row  mt-2">
           <div className="col-3"><b>DESCRIPTIONS:</b></div><div className="col-9">{cakedetail.description} </div>  
           </div>
           <div className="row mt-5">
           <div className="col-3">    </div>
           <div className="col-6"> 
           <button type="button" onClick={addtocart} className="btn text-uppercase p-2 text-white mr-2 font-weight-bold" style={{backgroundColor:"#043d76"}}  >Add to cart</button>
            
            <button type="button" className="btn btn-danger  text-white font-weight-bold">{heart}</button>
            </div>
            </div>
         </div>
	      </div>
      </div>
      )
  );
}

export default  connect(function(state,props){
  return {
    user :state?.user?.name,
    loginstatus:state?.isloggedin
  }
})(Cakedetails);