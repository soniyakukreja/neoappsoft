import axios from 'axios'
import Cake from './Cake';
import {useEffect , useState} from "react";
import queryString from "query-string"
function Search(props)
{       
    const parsed = queryString.parse(props.location.search)
    console.log('parsed',parsed)
   // console.log(props.location.search)

       let [cakesearch,setCakes]=useState([])
  
        //using query string 
        let apisearchurl="https://apibyashu.herokuapp.com/api/searchcakes?q="+parsed.q
        useEffect(() => {
            axios({
                url:apisearchurl,
                method:"get",
            }).then((response)=>{
                console.log("response from search api" ,response.data)
                setCakes(response.data.data)
            },(error)=>{
                console.log("error from search api",error)
            })
        }, [props.location.search])
            
    return (
        
            
        <div className="searchcakes" style={{marginTop:"20px",paddingLeft:"30px"}}>
         <h2>Search Cakes Section</h2>
          <div className="row">
            { cakesearch?.length > 0 ? cakesearch.map((each, index)=>{
		          return <Cake cakedat={each} key={index}/>
		        }) : <div className="alert alert-danger"> No result found</div>
		    }
          </div>
        </div>
    )
}
export default Search