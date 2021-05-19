import {useEffect , useState} from "react";
import queryString from "query-string"
import axios from 'axios'
import Cake from './Cake';
import Carousel from './Carousel'
import Spinner from "../UI/Spinner";


function Search(props)
{       
    var baseurl  = process.env.REACT_APP_BASE_URL

    const [loading, setLoading] = useState(false);
    const parsed = queryString.parse(props.location.search)

       let [cakesearch,setCakes]=useState([])
  
        //using query string 
        let apisearchurl= baseurl+"searchcakes?q="+parsed.q

        useEffect(() => {
            setLoading(true);
            axios({
                url:apisearchurl,
                method:"get",
            }).then((response)=>{
                setCakes(response.data.data)
                setLoading(false);
            },(error)=>{
                console.log("error from search api",error)
                setLoading(false);
            })
        }, [props.location.search])
            
    return (
        <>
        <Carousel />
        {loading ? (
          <Spinner />
        ) : (
        <div className="searchcakes" style={{marginTop:"20px",paddingLeft:"30px"}}>
         <h2>Your Searched Selection</h2>
            {cakesearch?.length >0 ?
          <div className="row">
            { cakesearch?.length > 0 ? cakesearch.map((each, index)=>{
		          return <Cake cakedat={each} key={index}/>
		        }) : ''
		    }</div>:<div className="alert alert-danger text-center m-3"><center> No result found</center></div>}
          
        </div> )}
        </>
    )
}
export default Search