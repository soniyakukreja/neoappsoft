import React, { useState, useEffect } from 'react';
import Cake from './Cake'
import cakesfromdatafile from './data.js'
import axios from "axios"
import Carousel from "./Carousel"

function Home() {
  
  let [cakes,setCakes]=useState([])
  let apiurl="https://apibyashu.herokuapp.com/api/allcakes"

  useEffect(() => {
        axios({
            url:apiurl,
            method:"get",
       }).then((response)=>{
          setCakes(response.data.data)
       },(error)=>{
          console.log("Error from AllCakes api",error)  
       })
  },[]);
           

  return (  
    <div>
      <Carousel />
        <center><h3>All Cakes Section</h3></center>
	    <div className="row" style={{ paddingLeft:"30px"}}>
		    { cakes?.length > 0 && cakes.map((each, index)=>{
		          return (<Cake cakedat={each} key={index}/>)
		        })
		    }
	   </div>
	</div>
  );
}

export default Home;