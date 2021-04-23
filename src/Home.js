import React, { useState, useEffect } from 'react';
import Cake from './Cake'
import cakesfromdatafile from './data.js'
import axios from "axios"
import Carousel from "./Carousel"
import Spinner from "./UI/Spinner";

function Home() {
  
  const [loading, setLoading] = useState(false);
  let [cakes,setCakes]=useState([])
  let apiurl="https://apibyashu.herokuapp.com/api/allcakes"

  useEffect(() => {
    setLoading(true);
        axios({
            url:apiurl,
            method:"get",
       }).then((response)=>{
          setCakes(response.data.data)
          setLoading(false);
       },(error)=>{
          console.log("Error from AllCakes api",error) 
          setLoading(false); 
       })
  },[]);
           

  return (  
    <div>
      <Carousel />

      {loading?( <Spinner />
      ):(

	    <div className="row">
		    { cakes?.length > 0 && cakes.map((each, index)=>{
		          return (<Cake cakedat={each} key={index}/>)
		        })
		    }
	   </div>
     )}
	</div>
  );
}

export default Home;