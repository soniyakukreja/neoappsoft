import React, {useEffect } from 'react';
import Cake from './Cake'
// import cakesfromdatafile from '../data.js'
// import axios from "axios"
import Carousel from "./Carousel"
import Spinner from "../UI/Spinner";
import { connect } from 'react-redux'

function Home(props) {
  useEffect(() => {
    props.dispatch({
      type:"AllCakes",
    })
  },[]);
           

  return (  
    <main className="Site-content Site-content--full">
      <Carousel />

      {props.loading?( <Spinner />
      ):(
        <div className="mainDiv">
        <div className="row" style={{paddingLeft:"20px",paddingRight:"20px"}}>
          { props.cakes?.length > 0 && props.cakes.map((each, index)=>{
                return (<Cake cakedat={each} key={index}/>)
              })
          }
        </div>
        </div>
     )}
	</main>
  );
}

export default connect((state,props)=>{
  return{
    cakes:state?.cakes,
    loading:state?.loading
  }
})(Home)